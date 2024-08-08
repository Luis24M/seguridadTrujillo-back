const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: DataTypes.STRING(50),
    apellido: DataTypes.STRING(50),
    email: DataTypes.STRING(100),
    contrasena: DataTypes.STRING(255),
    telefono: DataTypes.STRING(20),
    fecha_registro: DataTypes.DATE,
}, {
    tableName: 'usuarios',
    timestamps: false,
});

module.exports = Usuario;
