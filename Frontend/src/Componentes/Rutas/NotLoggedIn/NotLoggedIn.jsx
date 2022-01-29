// React
import React, { useState } from 'react';
// Axios
import axios from 'axios';
// Urls
import { AUTENTIFICACION_BACK_URL } from '../../../enviroment';

export function NotLoggedIn() {
    // Estados de inputs para formulario controlado
    const [inputs, setInputs] = useState({
        user_dni: ''
    })
    // Esatdo para errores
    const [error, setError] = useState({
        isError: false,
        mensajeError: ''
    })

    // HandleOnChange
    function handleOnChange(event) {
        // Seteamos el nuevo estado de inputs
        setInputs({
            ...inputs, // Copiamos el estado actual
            [event.target.name]: event.target.value // Seteamos la propiedad con el name del target del evento y el valor con su valor
        })
    }

    // HandleOnSubmit
    function handleOnSubmit(event) {
        // Prevenimos el enviado del formulario por defecto
        event.preventDefault();

        // Enviamos los datos solo si el input no esta vacio
        inputs.user_dni && axios.post(AUTENTIFICACION_BACK_URL, { userDni: parseInt(inputs.user_dni) })
            .then(response => {
                // Verificamos si existe el usuario
                if (response.data.auth) { // Si la propiedad auth es true...
                    // Guardamos el user en localStorage
                    window.localStorage.setItem(
                        'userSession', JSON.stringify(response.data.user)
                    );
                    // Recargamos al pagina
                    window.location.reload();
                }
            })
            .catch(error => setError({ isError: true, mensajeError: 'El dni no existe' }));
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
        </div>);
}