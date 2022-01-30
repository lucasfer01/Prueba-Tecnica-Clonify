// Sequelize
const { Sequelize } = require('sequelize');
// Variables de entorno
const { POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DBNAME } = process.env;
// Models
const modelos = {
    user: require('../models/user.model'),
    post: require('../models/post.model')
}

// Datos de conexion DB
const sequelize = new Sequelize(`postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DBNAME}`, { logging: false });

// Injectamos conexion con sequelize
Object.values(modelos).forEach(modelo => modelo(sequelize)); // Usamos Object.values para obtener solamente los valores del objeto y a cada una llamamos a la funcion pasandole como parametro el objeto sequelize

// Le ponemos la mayuscula al nombre del modelo
const modelsKeyValue = Object.entries(sequelize.models); // Separamos la propiedad y el valor con Object.entries, le pasamos como parametro los modelos y guardamos los arrays en una variable
const mayusculaModelos = modelsKeyValue.map(arrayKeyValue => [arrayKeyValue[0][0].toUpperCase() + arrayKeyValue[0].slice(1), arrayKeyValue[1]]); // 1ero: Mapeamos la variable con todos los pares key-value
// 2do: Retornamos un array donde en la primera posicion va a estar la posicion 0 de la posicion 0 (para tomar solo la primer letra de la propiedad) del parametro del map en mayuscula y a eso se le suma lo que resta de la palabra menos la primer letra porque ya la tenemos (iniciamos el slice en 1 hasta el final). Y en la segunda posicion pondremos el value sin ninguna modificacion
// Ejemplo: [key, value] va a retornar [Key, value]

// Volvemos a convertir todos los pares Key-Value en un objeto y lo almacenamos en sequelize.models
sequelize.models = Object.fromEntries(mayusculaModelos);

// Relaciones
const { User, Post } = sequelize.models;

User.hasMany(Post, { foreignKey: 'user_id' }); // Un usuario puede tener muchos post
Post.belongsTo(User); // El post solo pertenece a un usuario


// Exportamos
module.exports = {
    ...sequelize.models, // Para poder requerirlos con destructuring de objetos
    sequelize
}