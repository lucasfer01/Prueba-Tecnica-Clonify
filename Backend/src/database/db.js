// Sequelize
const { Sequelize } = require('sequelize');
// Variables de entorno
const { POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DBNAME } = process.env;

// Datos de conexion DB
const sequelize = new Sequelize(`postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DBNAME}`, {logging: false});


// Exportamos
module.exports = {
    sequelize
}