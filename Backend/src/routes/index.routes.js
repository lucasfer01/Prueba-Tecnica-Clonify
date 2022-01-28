// Express 
const { Router } = require('express');
// Creamos Router
const rutas = Router();
// Routers
const { userRoutes } = require('./user.routes');

// rutas
rutas.use('/user', userRoutes); // Rutas de usuario

// Exportamos las rutas
module.exports = {
    rutas
}