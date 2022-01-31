// Model
const { User, Post } = require('../database/db');

// Datos de usuario
const usuarios = [{ 
    user_dni: 12345678,
    user_name: 'Sergio Ortiz'        
},{
    user_dni: 87654321,
    user_name: 'Martin Ries'
},{
    user_dni: 42301106,
    user_name: 'Lucas Fernandez'
}];

// Posteos
const posteos = [{
    post_title: 'Titulo post de Sergio #1',
    post_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ex dui, egestas ut dapibus a, tempor sed tellus. Sed mauris risus, bibendum id imperdiet nec, placerat non erat. Cras ornare iaculis risus nec feugiat. Integer porta augue non ex ullamcorper, vel elementum arcu imperdiet. Aliquam egestas nulla vitae diam facilisis tempor. Maecenas vestibulum quis odio sit amet commodo. Donec',
    post_image: ['https://i.ytimg.com/vi/Ea88U3bOUqM/mqdefault.jpg'],
    user_id: 1
},{
    post_title: 'Titulo post de Sergio #2',
    post_description: 'Duis id mattis nisi, hendrerit accumsan diam. Pellentesque consectetur magna hendrerit nunc auctor tristique. Vestibulum augue tortor, varius vitae quam cursus, tincidunt sodales risus. Maecenas non malesuada dolor, non aliquam arcu. Ut quis ornare orci. Proin diam purus, vehicula non feugiat ac, ultrices vel tellus.',
    post_image: ['https://s.yimg.com/ny/api/res/1.2/jlf_sR50t4UjmoAwY9O6hQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MA--/https://media.zenfs.com/es-ar/iprofesional_650/be5f30e183e834091c6eff07b36e0784'],
    user_id: 1 
},{
    post_title: 'Titulo post de Martin #1',
    post_description: 'Aliquam tincidunt, nisl a bibendum placerat, sapien odio finibus ex, eget iaculis mi sem at risus. Donec sit amet egestas tellus, in porttitor lacus. Fusce mattis condimentum tortor quis rutrum. Donec dignissim justo tellus, quis scelerisque mi ornare a. Sed sed tempus augue.',
    post_image: ['https://i2.wp.com/bahiacesar.com/wp-content/uploads/2020/04/cloniy_app-mobile-varios.jpg?resize=350%2C200&ssl=1'],
    user_id: 2
},{
    post_title: 'Titulo post de Martin #2',
    post_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ex dui, egestas ut dapibus a, tempor sed tellus. Sed mauris risus, bibendum id imperdiet nec, placerat non erat. Cras ornare iaculis risus nec feugiat. Integer porta augue non ex ullamcorper, vel elementum arcu imperdiet. Aliquam egestas nulla vitae diam facilisis tempor. Maecenas vestibulum quis odio sit amet commodo. Donec',
    post_image: ['https://www.unidiversidad.com.ar/cache/foto79_1000_1100.jpg'],
    user_id: 2
}]

// Precargar usuarios y posteos
function precargarDatos() {
    // Mapeamos el array de usuario y por cada posicion creamos la promesa para crear el registro en la base de datos
    const promesasUsuarios = usuarios.map(usuario => User.create(usuario));

    // Hacemos un promises all para resolver las promesas del array
    Promise.all(promesasUsuarios)
        .then(response => { // Cuando se resuelvan las promesas
            // Notificamos que los usuario fueron cargados correctamente
            console.log('usuarios cargados correctamente');

            // Hacemos lo mismo pero con los post
            const promesasPosteos = posteos.map(posteo => Post.create(posteo));

            // Hacemos promise all nuevamente para cargar los post
            Promise.all(promesasPosteos)
                .then(response => console.log('Posteos cargados correctamente')) // Notificamos que los posteos fueron cargados correctamente
        })
        .catch(error => console.log(error)); // Si ocurre algun error lo enviamos a la consola
}

// Exportamos la funcion
module.exports = {
    precargarDatos
}