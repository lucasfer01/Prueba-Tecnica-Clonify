// Router express
const { Router } = require('express');
// Creamos router
const userRoutes = Router();
// Controladores de usuario
const { crearUsuario, mostrarUsuarios, buscarUsuarioById, editarUsuario } = require('../controllers/user.controller');

// Rutas
userRoutes.post('/', crearUsuario); // Crear usuario

userRoutes.get('/', mostrarUsuarios); // Mostrar todos los usuarios

userRoutes.get('/:userId', buscarUsuarioById); // Buscamos un usuario por Id

userRoutes.put('/:userId', editarUsuario); // Editar usuario

// Exportamos el router
module.exports = {
    userRoutes
}