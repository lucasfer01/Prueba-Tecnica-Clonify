// Router express
const { Router } = require('express');
// Creamos router
const userRoutes = Router();
// Controladores de usuario
const { crearUsuario, mostrarUsuarios, buscarUsuarioById } = require('../controllers/user.controller');

// Rutas
userRoutes.post('/', crearUsuario); // Crear usuario

userRoutes.get('/', mostrarUsuarios); // Mostrar todos los usuarios

userRoutes.get('/:userId', buscarUsuarioById); // Buscamos un usuario por Id

// Exportamos el router
module.exports = {
    userRoutes
}