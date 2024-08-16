const express = require('express');
const app = express();
const sequelize = require('./config/db');
const admin = require('./config/firebase');
const usuarioRoutes = require('./routes/usuarioRoutes');
const incidenteRoutes = require('./routes/incidenteRoutes');
const tipoIncidenteRoutes = require('./routes/tipoIncidenteRoutes');
const puntoSeguroRoutes = require('./routes/puntoSeguroRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes');

// Configuraciones generales
app.use(express.json());

// Rutas
app.use('/usuarios', usuarioRoutes);
app.use('/incidentes', incidenteRoutes);
app.use('/tipos-incidente', tipoIncidenteRoutes);
app.use('/puntos-seguros', puntoSeguroRoutes);
app.use('/comentarios', comentarioRoutes);

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
