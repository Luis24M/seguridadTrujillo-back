const express = require('express');
const app = express();
const { sequelize } = require('./models');  // Importa sequelize desde models/index.js

// Configuraciones generales
app.use(express.json());

// Rutas
// app.use('/api/usuarios', require('./routes/usuarios')); 
// Aquí irían todas tus rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/api', usuarioRoutes);

// Sincronizar los modelos y base de datos
sequelize.sync({ force: false }).then(() => {
    console.log('Base de datos sincronizada');
}).catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
});

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
