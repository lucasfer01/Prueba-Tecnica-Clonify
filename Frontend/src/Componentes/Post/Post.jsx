// React
import React, { useState } from 'react';
// Estilos
import estilosPost from './Post.module.css';
// React-Icon
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
// React-router
import { useNavigate } from 'react-router-dom';
// Url
import { POST_BACK_URL } from '../../enviroment';
// Axios
import axios from 'axios';
// Spinner
import spinnerLoader from '../../media/loaderConfirmacion.gif';

export function Post({ titulo, descripcion, foto, id }) {
    // Estado de confirmacion
    const [componenteConfirmacion, setComponenteConfirmacion] = useState(false);
    // Estado spinner confirmacion de borrado
    const [spinner, setSpinner] = useState(false);

    // UseNavigate
    const navigate = useNavigate();

    // HandleOnClickEditar
    function handleOnClickEditar(postId) {
        // Direccionamos al componente para editar el post con el id del post
        navigate(`/editarPost/${postId}`);
    }

    // HandleOnClickEliminar
    function HandleOnClickEliminar() {
        // Seteamos en true el estado de confirmarcion
        setComponenteConfirmacion(true)
    }

    // HandleOnClickConfirmacion
    function handleOnClickConfirmacion(desicion) {
        // Si desicion es true...
        if (desicion) {
            // Seteamos el estado del spinner en true
            setSpinner(true);

            // Usamos el endpoint del back para eliminar el post
            axios.delete(`${POST_BACK_URL}/${id}`)
                .then(response => window.location.reload()) // Cuando se borre recargamos la pagina
                .catch(error => console.log(error));
        } else { // Si el usuario no quiere borrar le post...
            // Seteamos el estado de confirmacion en false
            setComponenteConfirmacion(false);
        }
    }

    return (
        <div className={estilosPost.contenedorPost}>
            <h2>{titulo}</h2>

            <p>{descripcion}</p>

            {foto.length ? <img src={foto} width='90%' alt='Foto post' /> : ''}

            {/* botones editar y eliminar */}
            <button onClick={() => handleOnClickEditar(id)} className={estilosPost.botonEditar}>
                <AiFillEdit fill='#fff' />
            </button>

            <button onClick={HandleOnClickEliminar} className={estilosPost.botonEliminar}>
                <AiFillDelete fill='#fff' />
            </button>

            {componenteConfirmacion && (
                <div className={estilosPost.contenedorComponenteConfirmacion}>
                    <span>Estas seguro que quieres borrar el post?</span>

                    <div className={estilosPost.contenedorBotonesConfirmacion}>
                        <div>
                            <button className={estilosPost
                            .botonSi} onClick={() => handleOnClickConfirmacion(true)}>SI</button>

                            <button className={estilosPost.botonCancelar} onClick={() => handleOnClickConfirmacion(false)}>CANCELAR</button>
                        </div>

                        {spinner && <img src={spinnerLoader} width='30px' alt='Loader' />}
                    </div>
                </div>
            )}
        </div>
    );
}