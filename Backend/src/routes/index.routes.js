// Express 
const { Router } = require('express');
// Creamos Router
const rutas = Router();
// Routers
const { userRoutes } = require('./user.routes');
const { postRoutes } = require('./post.routes');

// rutas
rutas.use('/user', userRoutes); // Rutas de usuario

rutas.use('/post', postRoutes); // Rutas de post

// Exportamos las rutas
module.exports = {
    rutas
}