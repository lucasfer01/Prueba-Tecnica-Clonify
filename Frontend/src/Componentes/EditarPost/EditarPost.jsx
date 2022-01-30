// React
import React, { useEffect, useState } from 'react';
// Axios
import axios from 'axios';
// React-router-dom
import { useParams, useNavigate } from 'react-router-dom';
// Urls
import { POST_BACK_URL } from '../../enviroment';
// Estilos
import estilosEditarPost from './EditarPost.module.css';
// loader
import spinner from '../../media/spinner.jpg';
// Cloudinary controller
import { subirImagenes } from '../../Cloudinary/Cloudinary.controller';

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
    // Esatdo para cargando imagen
    const [cargandoImagen, setCargandoImagen] = useState(false);
    // Estados errores de formularios
    const [inputsErrors, setInputsErrors] = useState({
        titulo: false,
        descripcion: false
    })

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
    }, []);

    // HandleOnChange
    function handleOnChange(e) {
        // Validacion de formulario
        if (e.target.name === 'post_title') { // Si el input de titulo
            // Si tiene 100 caracteres no se cambia
            if (e.target.value.length > 100) return

            // Verificamos que no este vacio
            if (e.target.value.length === 0) {
                // Seteamos el estado de errorde titulo en true
                setInputsErrors({
                    ...inputsErrors, // Copiamos el estado
                    titulo: true // Seteamos que hay un error
                })
            } else { // Si esta todo correcto
                // Cambiamos el esatdo solo si esta en true
                inputsErrors.titulo && setInputsErrors({
                    ...inputsErrors, // 
                    titulo: false
                })
            }
        } else { // Si no es el input titulo es de de descripcion
            if(e.target.value.length === 0) { // Si el valor del campo descripcion es 0
                // Seteamos el estado de error de descripcion en true
                setInputsErrors({
                    ...inputsErrors, // Copiamos el estado
                    descripcion: true // Hay un error, seteamos el estado en true
                })
            } else { // Si esta todo correcto
                // Cambiamos el estado solo si esta en true
                inputsErrors.descripcion && setInputsErrors({
                    ...inputsErrors, // Copiamos el estado
                    descripcion: false
                })
            }
        }

        // Seteamos el estado con el nombre del target del evento
        setPost({
            ...post, // Copiamos el estado actual
            [e.target.name]: e.target.value
        });
    }

    // HandleAddFoto
    function handleAddFoto(e) {
        // Seteamos el estado de cargando imagen en true
        setCargandoImagen(true);

        // Subimos la imagen 
        e.target.files[0] && subirImagenes(e.target.files)
            .then(photoUrl => {
                setPost({
                    ...post, // Copiamos el estado
                    post_image: [photoUrl.data.url] // El nuevo valor de la propiedad post_image es la nueva foto
                })
                // Seteamos el estado de cargando imagen a false
                setCargandoImagen(false);
            })
            .catch(error => console.log(error))
    }

    // UseNavigate
    const navigate = useNavigate();

    // HandleOnSubmit
    function handleOnSubmit(e) {
        // Prevenimos enviado de formulario por defecto
        e.preventDefault();

        // Enviar modificaciones
        axios.put(`${POST_BACK_URL}/${postId}`, post)
            .then(response => navigate('/home')) // Redirigimos al home
            .catch(error => console.log(error));
    }

    return (loader ? ( // Rederizado condicional pantalla de carga
        <div className={estilosEditarPost.contenedor}>
            <img src={spinner} alt='Spinner' />
            <h1>Cargando...</h1>
        </div>
    ) : (
        <div className={estilosEditarPost.contenedor}>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <label>Titulo</label>
                    <input type="text" value={post.post_title} name='post_title' onChange={handleOnChange} />
                    {inputsErrors.titulo && (
                        <ul>
                            <li>El campo no puede estar vacio</li>
                            <li>No puede tener mas de 100 caracteres</li>
                        </ul>
                    )}
                </div>
                <div>
                    <label>Descripcion</label>
                    <textarea name="post_description" value={post.post_description} onChange={handleOnChange}></textarea>
                    {inputsErrors.descripcion && (
                        <ul>
                            <li>El campo no puede estar vacio</li>
                        </ul>
                    )}
                </div>
                <div>
                    <label>Fotos</label>
                    <div>
                        {post.post_image.length ? ( // Si hay imagenes mapeamos el array y renderizamos
                            <div>
                                <img src={post.post_image} width='200px' alt='Foto post' />
                                <button onClick={() => setPost({
                                    ...post,
                                    post_image: []
                                })}
                                >x</button>
                            </div>
                        ) : ''}

                    </div>
                    <input type="file" onChange={handleAddFoto} />
                    {cargandoImagen && <h3>Cargando imagen...</h3>}
                </div>

                <button type='submit'>Actualizar post</button>
            </form>
        </div>
    )
    );
}