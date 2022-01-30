// Tipos de datos
const { DataTypes } = require('sequelize');

// Creamos el modelo
// Exportamos una funciona que recibira como parametro el objeto sequelize que es necesario para crear el modelo
module.exports = (sequelize) => {
    // Utillizamos el parametro de la funcion para definir el modelo
    sequelize.define('post', {
        post_id: {
            type: DataTypes.INTEGER, // Tipo de dato entero
            primaryKey: true, // Indicamos que va a ser la primaryKey
            autoIncrement: true // Indicamos que sea serial
        },
        post_title: {
            type: DataTypes.STRING(100), // Indicamos que el titulo no puede tener mas de 100 letras para no ocupar espacio de mas en la base de datos
            allowNull: false, // Le indicamos que el post obligatoriamente debe tener un titulo
        },
        post_description: {
            type: DataTypes.TEXT, // Dejamos que usuario pueda escribir la cantidad que guste
            allowNull: false, // Indicamos que no puede ser null
        },
        post_image: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        },
        post_isActive: { // En vez de borrar seteamos este campo en false
            type: DataTypes.BOOLEAN, // Tipo de dato booleano
            defaultValue: true // el valor por defecto es true
        }
    })
}