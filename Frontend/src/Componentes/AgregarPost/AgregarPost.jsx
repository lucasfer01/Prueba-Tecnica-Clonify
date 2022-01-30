// React
import React, { useState } from 'react';
// Axios
import axios from 'axios';
// React-router-dom
import { useNavigate } from 'react-router-dom';
// Urls
import { POST_BACK_URL } from '../../enviroment';
// Estilos
import estilosEditarPost from '../EditarPost/EditarPost.module.css';
// Cloudinary controller
import { subirImagenes } from '../../Cloudinary/Cloudinary.controller';
// React-icons
import { AiFillDelete } from 'react-icons/ai';
import { IrAtras } from '../IrAtras/IrAtras';

export function AgregarPost() {
    // Estado data post
    const [post, setPost] = useState({
        post_title: '',
        post_description: '',
        post_image: []
    });

    // Esatdo para cargando imagen
    const [cargandoImagen, setCargandoImagen] = useState(false);
    // Estados errores de formularios
    const [inputsErrors, setInputsErrors] = useState({
        titulo: true,
        descripcion: true
    });
    // Estado que permite enviar el formulario
    const [canSendForm, setCanSendForm] = useState(false);

    // HandleOnChange
    function handleOnChange(e) {
        // Validacion de formulario
        if (e.target.name === 'post_title') { // Si el input de titulo
            // Si tiene 100 caracteres no se cambia
            if (e.target.value.length > 100) return

            // Verificamos que no este vacio
            if (e.target.value.length === 0) {
                // Seteamos el estado de error de titulo en true
                setInputsErrors({
                    ...inputsErrors, // Copiamos el estado
                    titulo: true // Seteamos que hay un error
                });

                // Seteamos que el formulario no puede ser enviado
                setCanSendForm(false);
            } else { // Si esta todo correcto
                // Cambiamos el esatdo solo si esta en true
                inputsErrors.titulo && setInputsErrors({
                    ...inputsErrors, // 
                    titulo: false
                });

                // Si titulo y descripcion son false entonces no tienene errores, por ende podemos enviar el formulario
                (!inputsErrors.titulo && !inputsErrors.descripcion) && setCanSendForm(true); // Si ambos son false seteamos el estado de canSendForm en true
            }
        } else { // Si no es el input titulo es de de descripcion
            if (e.target.value.length === 0) { // Si el valor del campo descripcion es 0
                // Seteamos el estado de error de descripcion en true
                setInputsErrors({
                    ...inputsErrors, // Copiamos el estado
                    descripcion: true // Hay un error, seteamos el estado en true
                });

                // Seteamos que el formulario no puede ser enviado
                setCanSendForm(false);
            } else { // Si esta todo correcto
                // Cambiamos el estado solo si esta en true
                inputsErrors.descripcion && setInputsErrors({
                    ...inputsErrors, // Copiamos el estado
                    descripcion: false
                });

                // Si titulo y descripcion son false entonces no tienene errores, por ende podemos enviar el formulario
                (!inputsErrors.titulo && !inputsErrors.descripcion) && setCanSendForm(true); // Si ambos son false seteamos el estado de canSendForm en true
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

        // Obtenemos el id del localStorage
        const idUsuario = JSON.parse(window.localStorage.getItem('usuarioSesionActual')).user_id;

        console.log(idUsuario);

        // Enviar modificaciones
        canSendForm && axios.post(`${POST_BACK_URL}`, { ...post, user_id: idUsuario })
            .then(response => navigate('/home')) // Redirigimos al home
            .catch(error => console.log(error));
    }

    return (
        <div className={estilosEditarPost.contenedor}>
            <form className={estilosEditarPost.formulario} onSubmit={handleOnSubmit}>
                <div className={estilosEditarPost.divFormulario}>
                    <label className={estilosEditarPost.label}>Titulo</label>
                    <input className={estilosEditarPost.tituloInput} type="text" value={post.post_title} name='post_title' onChange={handleOnChange} />
                    {inputsErrors.titulo && (
                        <ul className={estilosEditarPost.error}>
                            <li>El campo no puede estar vacio</li>
                            <li>No puede tener mas de 100 caracteres</li>
                        </ul>
                    )}
                </div>
                <div className={estilosEditarPost.divFormulario}>
                    <label className={estilosEditarPost.label}>Descripcion</label>
                    <textarea className={estilosEditarPost.descripcionInput} name="post_description" value={post.post_description} onChange={handleOnChange}></textarea>
                    {inputsErrors.descripcion && (
                        <ul className={estilosEditarPost.error}>
                            <li>El campo no puede estar vacio</li>
                        </ul>
                    )}
                </div>
                <div className={estilosEditarPost.divFormulario}>
                    <label className={estilosEditarPost.label}>Fotos</label>
                    <div>
                        {post.post_image.length ? ( // Si hay imagenes mapeamos el array y renderizamos
                            <div className={estilosEditarPost.contenedorImagen}>
                                <img src={post.post_image} width='400px' alt='Foto post' />
                                <button className={estilosEditarPost.eliminarFotoBoton} onClick={() => setPost({
                                    ...post,
                                    post_image: []
                                })}
                                >
                                    <AiFillDelete fill='#fff' />
                                </button>
                            </div>
                        ) : (
                            <div className={estilosEditarPost.contenedorImagen}>
                                <span>No hay <br /> imagen cargada</span>
                            </div>
                        )}

                    </div>
                    <input className={estilosEditarPost.inputFile} type="file" onChange={handleAddFoto} />
                    {cargandoImagen && <h3>Cargando imagen...</h3>}
                </div>

                <button className={estilosEditarPost.enviarFormularioBoton} 
                        disabled={!canSendForm} 
                        type='submit'>
                            Actualizar post
                </button>

                {!canSendForm && <h4>No se puede actualizar el post debido <br /> a un error en alguno de los campos</h4>}

                <IrAtras/>
            </form>
        </div>
    );
}