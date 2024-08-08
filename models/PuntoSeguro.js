const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const TipoPuntoSeguro = require('./TipoPuntoSeguro'); // Relación con TipoPuntoSeguro

const PuntoSeguro = sequelize.define('PuntoSeguro', {
    id_punto_seguro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_tipo_punto_seguro: {
        type: DataTypes.INTEGER,
        references: {
            model: TipoPuntoSeguro,
            key: 'id_tipo_punto_seguro',
        },
    },
    nombre: DataTypes.STRING(100),
    latitud: DataTypes.DECIMAL(10, 8),
    longitud: DataTypes.DECIMAL(11, 8),
    direccion: DataTypes.STRING(255),
    telefono: DataTypes.STRING(20),
    horario: DataTypes.STRING(100),
}, {
    tableName: 'puntos_seguros',
    timestamps: false,
});

module.exports = PuntoSeguro;
