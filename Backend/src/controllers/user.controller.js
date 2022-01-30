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
                .then(usuarioCreado => res.status(201).json(usuarioCreado)) // Retornamos el objeto en formato json
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
            },
            attributes: { // Excluimos estos campos solo cuando traemos todos los usuarios
                exclude: ['createdAt', 'updatedAt', "userUserId"]
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
        where: { // Buscamo por id
            user_id: userId
        },
        include: [{
            required: false, // Puede ser null
            model: Post, // Modelo
            where: { // Solo los post que no fueron "Borrados"
                post_isActive: true
            },
            attributes: {
                exclude: ["userUserId"]
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

// Editar usuario
const editarUsuario = (req, res) => {
    // Recibimos el userId por req.params
    const { userId } = req.params;
    // Data a editar por req.body
    const dataUser = req.body;

    // Buscamos el usuario por el id
    User.findByPk(userId)
        .then(usuarioEncontrado => {
            // Por las dudas verificamos que haya encontrado el usuario
            if (!usuarioEncontrado) { // En caso de que no lo haya encontrado
                return res.status(404).json({ error: 'Usuario no encontrado' }); // Enviamos un mensaje de error notificando que no se encontro el usuario
            }

            // Si lo encontró lo editamos
            usuarioEncontrado.update(dataUser)
                .then(usuarioEditado => res.json(usuarioEditado)) // Enviamos el usuario editado
        })
        .catch(error => res.status(500).json({ error: 'Ha ocurrido un error inesperado' })); // En caso de que ocurra un error lo notificamos
}

// Eliminar usuarios
const eliminarUsuarios = (req, res) => {
    // Recibimos el userId por req.params
    const { userId } = req.params;

    // Buscamos al usuario por id
    User.findByPk(userId)
        .then(usuarioEncontrado => {
            // Verificamos si lo encontró
            if (!usuarioEncontrado) { // Si no lo encontró...
                return res.status(404).json({ error: 'Usuario no encontrado' }); // Lo notificamos con un mensajey status code 404
            }

            // Si lo encontró lo "borramos"
            usuarioEncontrado.update({ // Le actualizamos el campo user_isActive al contrario
                user_isActive: !usuarioEncontrado.user_isActive
            })
                .then(response => res.json({ exito: 'Usuario borrado correctamente' })) // Si salio todo bien lo notificamos
        })
        .catch(error => res.status(500).json({ error: 'Ha ocurrido un error inesperado' })); // Si ocurre algun error lo notificamos
}

// Exportamos las funciones
module.exports = {
    crearUsuario,
    mostrarUsuarios,
    buscarUsuarioById,
    editarUsuario,
    eliminarUsuarios
}