// Express 
const { Router } = require('express');
// Creamos Router
const rutas = Router();
// Routers
const { userRoutes } = require('./user.routes');
const { postRoutes } = require('./post.routes');
// Autenticacion
const { autentificacion } = require('../controllers/autenticacion.controller');

// rutas
rutas.use('/user', userRoutes); // Rutas de usuario

rutas.use('/post', postRoutes); // Rutas de post

rutas.post('/auth-user', autentificacion); // Autentificar dni

// Exportamos las rutas
module.exports = {
    rutas
}