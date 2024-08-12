const express = require('express');
const app = express();
const sequelize = require('./config/db');  // Asegúrate de importar sequelize correctamente
const admin = require('./config/firebase'); // Solo asegúrate de que Firebase esté inicializado
const usuarioRoutes = require('./routes/usuarioRoutes');

// Configuraciones generales
app.use(express.json());

// Rutas
app.use('/api', usuarioRoutes);

// Sincronizar los modelos y base de datos
sequelize.sync({ force: false }).then(() => {
    console.log('Base de datos sincronizada');
}).catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
});


// ================== Endpoints de autenticación ==================
app.post('/register', async (req, res) => {
    // Lógica para registrar un usuario
    admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
    }).then(user => {
        console.log('Usuario registrado:', user);
        res.status(200).json({ message: 'Usuario registrado' });
    }).catch(error => {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    });
});

app.post('/login', async (req, res) => {
    // Lógica para iniciar sesión
    admin.auth().getUserByEmail(req.body.email)
        .then(user => {
            console.log('Usuario encontrado al iniciar sesión:', user);
            res.status(200).json({ message: 'Usuario encontrado' });
        }
        ).catch(error => {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ message: 'Error al iniciar sesión' });
        }
        );
});

// mostrar los usuarios
app.get('/users', async (req, res) => {
    admin.auth().listUsers()
        .then(users => {
            console.log('Usuarios listados:', users);
            res.status(200).json(users);
        }).catch(error => {
            console.error('Error al listar usuarios:', error);
            res.status(500).json({ message: 'Error al listar usuarios' });
        });
});

// ================== Autenticación con Firebase ==================
// Importar el middleware
const verifyToken = require('./middlewares/authMiddleware');

// Ruta protegida
app.get('/api/usuarios', verifyToken, (req, res) => {
    res.json({ message: 'Ruta protegida' });
});

// Ruta pública
app.get('/api/publica', (req, res) => {
    res.json({ message: 'Ruta pública' });
});

// ===============================================================

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
