const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./Usuario'); // Relación con Usuario
const Incidente = require('./Incidente'); // Relación con Incidente

const Comentario = sequelize.define('Comentario', {
    id_comentario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_incidente: {
        type: DataTypes.INTEGER,
        references: {
            model: Incidente,
            key: 'id_incidente',
        },
    },
    uid: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'uid',
        },
    },
    contenido: DataTypes.TEXT,
    fecha_hora: DataTypes.DATE,
}, {
    tableName: 'comentarios',
    timestamps: false,
});

module.exports = Comentario;
