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

// Middleware
app.use('/', rutas);

// Ponemos el servidor a la escucha de peticiones
app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`);
});