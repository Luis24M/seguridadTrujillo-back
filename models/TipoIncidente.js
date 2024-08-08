const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TipoIncidente = sequelize.define('TipoIncidente', {
    id_tipo_incidente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: DataTypes.STRING(50),
    descripcion: DataTypes.TEXT,
}, {
    tableName: 'tipos_incidentes',
    timestamps: false,
});

module.exports = TipoIncidente;
