const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./Usuario'); // Relación con Usuario
const TipoIncidente = require('./TipoIncidente'); // Relación con TipoIncidente

const Incidente = sequelize.define('Incidente', {
    id_incidente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uid: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'uid',
        },
    },
    id_tipo_incidente: {
        type: DataTypes.INTEGER,
        references: {
            model: TipoIncidente,
            key: 'id_tipo_incidente',
        },
    },
    latitud: DataTypes.DECIMAL(10, 8),
    longitud: DataTypes.DECIMAL(11, 8),
    direccion: DataTypes.STRING(255),
    descripcion: DataTypes.TEXT,
    fecha_hora: DataTypes.DATE,
}, {
    tableName: 'incidentes',
    timestamps: false,
});

module.exports = Incidente;
