// Express
const express = require('express');
// Creamos servidor
const app = express();
// Dotenv para leer variables de entorno
require('dotenv').config();
// Port
const { PORT } = process.env;
// Rutas
const { rutas } = require('./src/routes/index.routes');
// Morgan
const morgan = require('morgan');
// Sequelize
const { sequelize } = require('./src/database/db');
// Cors
const cors = require('cors');
// Precarga de datos
const { precargarDatos } = require('./src/controllers/database.controller');

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/', rutas);

// Ponemos el servidor a la escucha de peticiones
app.listen(PORT, () => {
    // Mensaje de exito
    console.log(`Escuchando en puerto ${PORT}`);

    // Conectar a base de datos
    sequelize.sync({ force: true })
        .then(() => { // Si la conexion es exitosa
            console.log(`Conectado correctamente a DB ${process.env.POSTGRES_DBNAME}`);
            // Ejecutamos la funcion para precargar los datos
            precargarDatos();
        }) 
        .catch(error => console.log({ error: error })); // Si ocurre algun error
});