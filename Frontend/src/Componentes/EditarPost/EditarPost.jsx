// React
import React, { useEffect, useState } from 'react';
// Axios
import axios from 'axios';
// React-router-dom
import { useParams } from 'react-router-dom';
// Urls
import { POST_BACK_URL } from '../../enviroment';
// Estilos
import estilosEditarPost from './EditarPost.module.css';
// loader
import spinner from '../../media/spinner.jpg';

export function EditarPost() {
    // Obtenemos el id del post con useParams
    const { postId } = useParams();

    // Estado data post
    const [post, setPost] = useState({
        post_title: '',
        post_description: '',
        post_image: []
    });
    // Estado para loader
    const [loader, setLoader] = useState(true);

    // UseEffect
    useEffect(() => {
        // Hacemos peticion de los datos del post
        axios.get(`${POST_BACK_URL}/${postId}`)
            .then(postData => {
                // Seteamos el estado con la respuesta del back
                setPost(postData.data);

                // Seteamos el loader en false
                setLoader(false);
            })
            .catch(error => console.log(error));
    }, [postId]);

    // HandleOnChange
    function handleOnChange(e) {
        // Seteamos el estado con el nombre del target del evento
        setPost({
            ...post, // Copiamos el estado actual
            [e.target.name]: e.target.value
        });
    }

    return (loader ? (
        <div className={estilosEditarPost.contenedor}>
            <img src={spinner} alt='Spinner' />
            <h1>Cargando...</h1>
        </div>
    ) : (
        <div className={estilosEditarPost.contenedor}>
            <form>
                <div>
                    <label>Titulo</label>
                    <input type="text" value={post.post_title} name='post_title' onChange={handleOnChange} />
                </div>
                <div>
                    <label>Descripcion</label>
                    <textarea name="post_description" value={post.post_description} onChange={handleOnChange}></textarea>
                </div>
                <div>
                    <label>Fotos</label>
                    <div>
                        {post.post_image && <img src={post.post_image} width='200px' alt='Foto post' />}
                        <button onClick={() => setPost({
                            ...post,
                            post_image: []
                        })}
                        >x</button>
                    </div>
                </div>
            </form>
        </div>
    )
    );
}