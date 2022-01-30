// React
import React, { useEffect, useState } from 'react';
// Loader
import spinner from '../../media/spinner.jpg';
// Estilos
import estilosHome from './Home.module.css';
// Axios
import axios from 'axios';
// Urls
import { USER_BACK_URL } from '../../enviroment';
// Componentes
import { Post } from '../Post/Post';

export function Home() {
    // Estado de usuario
    const [usuario, setUsuario] = useState(null);
    // Estado loader
    const [loader, setLoader] = useState(true);

    // UseEffect
    useEffect(() => {
        // Buscamos los datos del usuario guardado en el localStorage
        const userLocalStorage = JSON.parse(window.localStorage.getItem('usuarioSesionActual')); // Lo guardamo en una variable parseado a objeto

        // Hacemos peticion al back con el id guardado en el localStorage
        axios.get(`${USER_BACK_URL}/${userLocalStorage.user_id}`)
            .then(user => { // Si encontro usuario
                // seteamos el esatdo de usuario con la respuesta
                setUsuario(user.data);
                // Seteamos el estado loader en false
                setLoader(false);
            })
            .catch(error => console.log(error));
    }, []);

    return (loader ? (
        <div className={estilosHome.contenedor}>
            <h1>Cargando...</h1>
            <img src={spinner} alt='Loader' />
        </div>
    ) : (
        <div className={estilosHome.contenedor}>
            {usuario.posts && usuario.posts.map(post => (
                <div key={post.post_id}>
                    <Post titulo={post.post_title}
                          descripcion={post.post_description}
                          foto={post.post_image && post.post_image}
                          id={post.post_id}/>
                </div>
            ))}
        </div>
    ));
}