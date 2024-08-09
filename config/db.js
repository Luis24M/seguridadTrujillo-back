const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD
    {
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT,
        dialect: 'mysql',
    }
);

sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos exitosa'))
    .catch(err => console.error('No se pudo conectar a la base de datos:', err));

module.exports = sequelize;
