// Router express
const { Router } = require('express');
// Creamos router
const userRoutes = Router();
// Controladores de usuario
const { crearUsuario, mostrarUsuarios, buscarUsuarioById, editarUsuario, eliminarUsuarios } = require('../controllers/user.controller');

// Rutas
userRoutes.post('/', crearUsuario); // Crear usuario

userRoutes.get('/', mostrarUsuarios); // Mostrar todos los usuarios

userRoutes.get('/:userId', buscarUsuarioById); // Buscamos un usuario por Id

userRoutes.put('/:userId', editarUsuario); // Editar usuario

userRoutes.delete('/:userId', eliminarUsuarios); // Eliminar usuarios

// Exportamos el router
module.exports = {
    userRoutes
}