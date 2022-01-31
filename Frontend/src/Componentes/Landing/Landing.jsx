// React
import React, { useState } from 'react';
// Axios
import axios from 'axios';
// Url
import { AUTENTIFICACION_BACK_URL } from '../../enviroment';
// Estilos
import estilosLanding from './Landing.module.css';
// Loader
import spinner from '../../media/loaderConfirmacion.gif';

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
    // Estado loader
    const [loader, setLoader] = useState(false);

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
            .catch(error => {
                // Seteamos el estado de error en true y le pasamos un mensaje de error
                setError({ isError: true, mensajeError: 'El dni no pertenece a ningun usuario' });

                // Seteamos el loader en false
                setLoader(false);
            }); 
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
        <div className={estilosLanding.contenedor}>
            <div className={estilosLanding.contenedorForm}>
                <form className={estilosLanding.form} onSubmit={handleOnSubmit}>
                    <span>Ingrese su D.N.I.</span>

                    <input className={estilosLanding.inputDniIniciarSesion} type="text" name='user_dni' placeholder='D.N.I.' value={inputs.user_dni} onChange={handleOnChange} />

                    {error.isError && (
                        <div>
                            <span>{error.mensajeError}</span>
                        </div>
                    )}

                    <div className={estilosLanding.contenedorBoton}>
                    <button className={estilosLanding.botonIniciarSesion} type='submit' onClick={() => setLoader(true)}>Iniciar sesion</button>
                    
                    {loader && <img src={spinner} width='30px' alt='Loader'/>}
                    </div>

                </form>
            </div>
        </div>
    );
}