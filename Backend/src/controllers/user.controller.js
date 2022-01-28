// Models
const { User, Post } = require('../database/db');

// Crear usuario
const crearUsuario = (req, res) => {
    // Data del usuario por req.body
    const dataUsuario = req.body;

    // Verificamos que no exista un registro con el dni
    User.findOne({
        where: {
            user_dni: dataUsuario.user_dni
        }
    })
        .then(usuario => {
            // Si encontró un usuario
            if (usuario) {
                // Devolvemos un mensaje de error
                return res.status(403).json({ error: 'Ya existe un usuario con ese D.N.I.' });
            }
            // Si no encontro a un usuario creamos el registro
            return User.create(dataUsuario)
                .then(usuarioCreado => res.json(usuarioCreado)) // Retornamos el objeto en formato json
        })
        .catch(error => res.status(500).json({ error: 'Ha ocurrido un error inesperado' })); // Si ocurre algun error enviamos un mensaje
}

// Obtenemos todos los usuarios
const mostrarUsuarios = (req, res) => {
    // Traemos todos los usuarios
    User.findAll({
        include: [{
            required: false, // Puede ser null
            model: Post, // Modelo
            where: { // Solo los post que no fueron "Borrados"
                post_isActive: true
            }
        }],
        where: { // Solo los usuarios que no fueron "Borrados"
            user_isActive: true
        },
        attributes: { // Excluimos los atributos createdAt y updatedAt ya que no los veo utiles por el momento
            exclude: ['createdAt', 'updatedAt']
        }
    })
        .then(usuarios => {
            // Verificamos si encontro usuarios
            if (!usuarios.length) {
                // Devolvemos un mensaje de error
                return res.status(404).json({ error: 'No se encontraron usuarios' }); // Notificamos que no se encontro junto con un status code 404
            }
            // Si encontró usuarios
            return res.json(usuarios); // Lo enviamos en formato json
        })
        .catch(error => res.status(500).json({ error: 'Ha ocurrido un error inesperado' })); // Si ocurre algun error lo notificamos
}

// Buscar usuario por id
const buscarUsuarioById = (req, res) => {
    // recibimos el userId por req.params
    const { userId } = req.params;

    // Buscamos el usuario
    User.findOne({
        where: { // Buscamo por id y solo lo traeremos si el usuario no fue "borrado"
            user_id: userId,
            user_isActive: true
        },
        include: [{
            required: false, // Puede ser null
            model: Post, // Modelo
            where: { // Solo los post que no fueron "Borrados"
                post_isActive: true
            }
        }],
        attributes: { // Excluimos los atributos createdAt y updatedAt ya que no los veo utiles por el momento
            exclude: ['createdAt', 'updatedAt']
        }
    })
        .then(usuarioEncontrado => {
            // Si no se encontró usuario
            if (!usuarioEncontrado) {
                return res.status(404).json({ error: 'Usuario no encontrado' }); // Notificamos que no se encontro junto con un status code 404
            }
            // Si encontró usuario
            return res.json(usuarioEncontrado); // Lo enviamos en formato json
        })
        .catch(error => res.status(500).json({ error: 'Ha ocurrido un error inesperado' })); // Si ocurre algun error lo notificamos
}

// Exportamos las funciones
module.exports = {
    crearUsuario,
    mostrarUsuarios,
    buscarUsuarioById
}