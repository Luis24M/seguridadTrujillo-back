const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TipoPuntoSeguro = sequelize.define('TipoPuntoSeguro', {
    id_tipo_punto_seguro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: DataTypes.STRING(50),
    descripcion: DataTypes.TEXT,
}, {
    tableName: 'tipos_puntos_seguros',
    timestamps: false,
});

module.exports = TipoPuntoSeguro;
