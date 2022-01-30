// Router Express
const { Router } = require('express');
// Creamos router
const postRoutes = Router();
// Controladores de post
const { crearPost, mostrarPosts, mostrarPostById, editarPost, eliminarPost } = require('../controllers/post.controller');

// Rutas
postRoutes.post('/', crearPost); // Crear post

postRoutes.get('/', mostrarPosts); // Mostrar todos los posts

postRoutes.get('/:postId', mostrarPostById); // Mostrar post por id

postRoutes.put('/:postId', editarPost); // Editar post

postRoutes.delete('/:postId', eliminarPost); // "Borrar" post

// Exportamos router
module.exports = {
    postRoutes
}