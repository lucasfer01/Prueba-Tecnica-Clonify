// Models
const { User } = require('../database/db');

// Autentificar datos
const autentificacion = (req,res) => {
    // Recibimos el dni por body
    const { userDni } = req.body;

    // Buscamos el usuario por dni
    User.findOne({
        where: { // Ademas no tiene que haber sido "borrado"
            user_dni: userDni,
            user_isActive: true
        }
    })
    .then(usuario => {
        // Verificamos si encontro al usuario
        if(!usuario) { // Si no lo encontro...
            return res.status(404).json({error: 'El D.N.I no pertenece a ningun usuario', auth: false}); // Enviamos un mensaje notificando y un status code 404
        }

        // Si lo encontro...
        return res.json({auth: true, user: usuario}); // Devolvemos un objeto indicando que auth es true y el dni del usuario para guardalo en las coockies
    })
    .catch(error => res.status(500).json({error: 'Ha ocurrido un error inesperado'})); // Si ocurre algun error los notificamos
}

// Exportamos las funcion
module.exports = {
    autentificacion
}