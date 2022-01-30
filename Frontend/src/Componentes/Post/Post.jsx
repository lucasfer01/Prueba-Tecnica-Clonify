// React
import React from 'react';
// Estilos
import estilosPost from './Post.module.css';
// React-Icon
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
// React-router
import { useNavigate } from 'react-router-dom';

export function Post({ titulo, descripcion, foto, id }) {
    // UseNavigate
    const navigate = useNavigate();

    // HandleOnClickEditar
    function handleOnClickEditar(postId) {
            // Direccionamos al componente para editar el post con el id del post
            navigate(`/editarPost/${postId}`);
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

            <button className={estilosPost.botonEliminar}>
                <AiFillDelete fill='#fff' />
            </button>

        </div>
    );
}