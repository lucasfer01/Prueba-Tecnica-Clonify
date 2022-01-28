// Models
const { Post } = require('../database/db');

// Crear post
const crearPost = (req, res) => {
    // Data del post por req.body
    const dataPost = req.body;

    // Creamos el post
    Post.create(dataPost)
        .then(postCreado => res.status(201).json(postCreado)) // Devolvemos el post en formato json
        .catch(error => res.status(500).json({ error: 'Ha ocurrido un error inesperado' })); // Si ocurre algun error lo notificamos
}

// Obtener todos los post
const mostrarPosts = (req, res) => {
    // Traemos todos los post
    Post.findAll({
        where: { // Solo los que no fueron "Borrados"
            post_isActive: true
        }
    })
        .then(postCreado => res.status(201).json(postCreado)) // Devolvemos el post creado en formato json
        .catch(error => res.status(500).json({ error: 'Ha ocurrido un error inesperado' })); // Si ocurre algun error lo notificamos
}

// Mostrar post por id
const mostrarPostById = (req, res) => {
    // postId por req.params
    const { postId } = req.params;

    // Buscamos el post por id
    Post.findOne({
        where: {
            post_id: postId
        },
        attributes: {
            exclude: ['userUserId']
        }
    })
        .then(post => {
            // Verificamos si encontro un post
            if (!post) { // Si no lo encontro
                return res.status(404).json({ error: 'Post no encontrado' }); // Lo notificamos con un mensaje y un status code 404
            }

            // Si encontro el post
            return res.json(post); // Devolvemos el post en formato json
        })
        .catch(error => res.status(500).json({ error: 'Ha ocurrido un error inesperado' })); // Si ocurre algun error lo notificamos
}

const editarPost = (req, res) => {
    // Obtenemos el postId de req.params
    const { postId } = req.params;
    // Data a editar del post por body
    const dataPost = req.body;

    // Buscamos el post por id
    Post.findByPk(postId)
        .then(postEncontrado => {
            // Verificamos si lo encontro
            if (!postEncontrado) { // Si no lo encontro...
                return res.status(404).json({ error: 'Post no encontrado' }); // Devolvemos un mensaje notificando y un status code 404
            }

            // Si lo encontro actualizamos el post
            postEncontrado.update(dataPost)
                .then(postActualizado => res.json(postActualizado)) // Si se actualizo correctamente lo devolvemos en formato json
        })
        .catch(error => res.status(500).json({ error: 'Ha ocurrido un error inesperado' })); // Si en algun momento ocurre un error los notificamos
}

// Eliminar post
const eliminarPost = (req, res) => {
    // obtenemos postId de reqq.params
    const { postId } = req.params;

    // Buscamos el post por id
    Post.findByPk(postId)
        .then(post => {
            // Verificamos si lo encontro
            if (!post) { // Si no lo encontro...
                return res.status(404).json({ error: 'Post no encontrado' }); // Enviamos un mensaje notificando y un status code 404
            }

            // Si lo encontro lo "borramos"
            post.update({ // Seteamos el post_isActive al contrario del que esta
                post_isActive: !post.post_isActive
            })
                .then(response => res.json({ exito: 'Post borrado correctamente' })) // Si todo salio bien mandamos un mensaje notificandolo
        })
        .catch(error => res.status(500).json({ error: 'Ha ocurrido un error inesperado' })); // Si ocurre algun error lo notificamos
}

// Exportamos las funciones
module.exports = {
    crearPost,
    mostrarPosts,
    mostrarPostById,
    editarPost,
    eliminarPost
}