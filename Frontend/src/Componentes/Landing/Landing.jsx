// React
import React, { useState } from 'react';
// Axios
import axios from 'axios';
// Url
import { AUTENTIFICACION_BACK_URL } from '../../enviroment';
// React-router-dom
import { Navigate } from 'react-router-dom';

export function Landing() {
    // Estados inputs
    const [inputs, setInputs] = useState({
        user_dni: '',
    });
    // Estados error
    const [error, setError] = useState({
        isError: false,
        mensajeError: ''
    });

    // handleOnsubmit
    function handleOnSubmit(e) {
        // Prevenimos el enviado por defecto del formulario
        e.preventDefault();

        // Verificamos si el dni se encuentra en la base de datos
        axios.post(AUTENTIFICACION_BACK_URL, { userDni: inputs.user_dni })
            .then(isAuth => { // Si encontro el usuario guardamos los datos en localStorage
                window.localStorage.setItem(
                    'usuarioSesionActual', JSON.stringify(isAuth.data.user)
                );

                // Redireccionamos a home con este metodo para que se recargue la pagina y vuelva a verificar el localStorage
                window.location.pathname = '/home';
            })
            .catch(error => setError({ isError: true, mensajeError: 'El dni no pertenece a ningun usuario' })); // Seteamos el estado de error en true y le pasamos un mensaje de error
    }

    // handleOnChange
    function handleOnChange(e) {
        // Setamos el estado del input con el valor del target del evento
        setInputs({
            ...inputs, // Copiamos el estado actual
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <input type="text" name='user_dni' placeholder='D.N.I.' value={inputs.user_dni} onChange={handleOnChange} />

                {error.isError && (
                    <div>
                        <span>{error.mensajeError}</span>
                    </div>
                )}

                <button type='submit'>Iniciar sesion</button>
            </form>
        </div>
    );
}