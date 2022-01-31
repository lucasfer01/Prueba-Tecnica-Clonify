// React
import React, { useState } from 'react';
// Estilos
import estilosCrearUsuario from './CrearUsuario.module.css';
// Loader
import spinner from '../../media/loaderConfirmacion.gif';
// Axios
import axios from 'axios';
// Urls
import { USER_BACK_URL } from '../../enviroment';

export function CrearUsuario() {
    // Estado de los inputs
    const [inputs, setInputs] = useState({
        user_dni: '',
        user_name: ''
    });
    // Estado loader
    const [loader, setLoader] = useState(false);
    // Estado error creacion de usuario
    const [errorCrearUsuario, setErrorCrearUsuario] = useState(false);

    // HandleOnChange
    function handleOnChange(e) {
        // Cambiamos la propiedad del estado con el nombre del input
        setInputs({
            ...inputs, // Copiamos el estado
            [e.target.name]: e.target.value
        })
    }

    // HandleOnSubmit
    function handleOnSubmit(e) {
        // Prevenimos el enviado de formulario por defecto
        e.preventDefault();

        // Seteamos el estado del loader en true
        setLoader(true);

        // Enviamos la informacion
        axios.post(USER_BACK_URL, {
            user_dni: parseInt(inputs.user_dni), // Parseamos a numero el dni del input
            user_name: inputs.user_name
        })
        .then(usuarioCreado => { // Si el usuario se creo correctamente
            // Guardamos los datos en localstorage parseado a string
            window.localStorage.setItem(
                'usuarioSesionActual', JSON.stringify(usuarioCreado.data)
            );

            // Recargamos la pagina para que vuelva a revisar el localStorage
            window.location.reload();
        })
        .catch(error => {
            // Seteamos el estado de error de registro en true
            setErrorCrearUsuario(true);
            
            // Seteamos el estado del loader en false
            setLoader(false);
        });
    }

    return (
        <form onSubmit={handleOnSubmit} className={estilosCrearUsuario.formulario}>
            <div>
                <h2 className={estilosCrearUsuario.titulo}>REGISTRO</h2>
            </div>

            <div className={estilosCrearUsuario.contenedorDni}>
                <label>D.N.I.</label>
                <input type='text' name='user_dni' value={inputs.user_dni} onChange={handleOnChange} />
            </div>

            <div className={estilosCrearUsuario.contenedorDni}>
                <label>Nombre</label>
                <input type='text' name='user_name' value={inputs.user_name} onChange={handleOnChange} />
            </div>

            <div className={estilosCrearUsuario.contenedorBoton}>
                {(!inputs.user_dni.length || !inputs.user_name.length) ?
                    (
                        <div className={estilosCrearUsuario.contenedorError}>
                            <ul style={{ margin: '0' }}>
                                <li>Ninguno de los campos puede estar vacio</li>
                            </ul>
                        </div>
                    ) : (
                        <div className={estilosCrearUsuario.contenedorError}>

                        </div>
                    )}

                <button type='submit' disabled={(!inputs.user_name.length || !inputs.user_dni.length)} className={estilosCrearUsuario.botonRegistrarse}>Registrarse</button>

                {loader ? (
                    <div className={estilosCrearUsuario.contenedorSpinner}>
                        <img src={spinner} width='30px' alt='Loader' />
                    </div>
                ) : (
                    <div className={estilosCrearUsuario.contenedorSpinner}>

                    </div>
                )}
            </div>

            {errorCrearUsuario && (
                <div className={estilosCrearUsuario.contenedorErrorCrearUsuario}>
                    <span>Ha ocurrido un error al crear usuario</span>

                    <ul>
                        <li>El D.N.I. podria ya pertenecer a un usuario</li>
                        <li>El D.N.I. solo puede ser numerico</li>
                    </ul>
                </div>
            )}
        </form>
    );
}