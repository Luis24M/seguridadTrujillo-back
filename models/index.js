const Sequelize = require('sequelize');
const sequelize = require('../config/db');

// Importar todos los modelos
const Usuario = require('./Usuario');
const Incidente = require('./Incidente');
const Comentario = require('./Comentario');
const TipoIncidente = require('./TipoIncidente');
const PuntoSeguro = require('./PuntoSeguro');
const TipoPuntoSeguro = require('./TipoPuntoSeguro');

// Establecer relaciones
Usuario.hasMany(Incidente, { foreignKey: 'id_usuario' });
Incidente.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Usuario.hasMany(Comentario, { foreignKey: 'id_usuario' });
Comentario.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Incidente.hasMany(Comentario, { foreignKey: 'id_incidente' });
Comentario.belongsTo(Incidente, { foreignKey: 'id_incidente' });

TipoIncidente.hasMany(Incidente, { foreignKey: 'id_tipo_incidente' });
Incidente.belongsTo(TipoIncidente, { foreignKey: 'id_tipo_incidente' });

TipoPuntoSeguro.hasMany(PuntoSeguro, { foreignKey: 'id_tipo_punto_seguro' });
PuntoSeguro.belongsTo(TipoPuntoSeguro, { foreignKey: 'id_tipo_punto_seguro' });

// Exportar modelos y sequelize
module.exports = {
    sequelize,
    Usuario,
    Incidente,
    Comentario,
    TipoIncidente,
    PuntoSeguro,
    TipoPuntoSeguro
};
