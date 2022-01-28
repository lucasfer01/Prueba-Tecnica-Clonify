// Tipos de datos
const { DataTypes } = require('sequelize');

// Creamos el modelo
// Exportamos una funcion que va a recibir como parametro el objeto de sequelize, para posteriormente hacer la conexion en un solo archivo
module.exports = (sequelize) => {
    // Definimos el modelo con el parametro de la funcion
    sequelize.define('user', {
        user_id: {
            type: DataTypes.INTEGER, // Va a ser un dato de tipo entero
            primaryKey: true, // Le indicamos que va a ser la primaryKey
            autoIncrement: true // Le indicamos que sea serial
        },
        user_dni: {
            type: DataTypes.INTEGER, // Tambien va a ser un entero,
            allowNull: false, // Le indicamos que esta campo NO puede estar vacio
            unique: true // Le indicamos que este campo no puede estar repetido
        }
    })
}