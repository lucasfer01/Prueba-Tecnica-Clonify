// React
import React, { useEffect, useState } from 'react';
// Logo
import logoClonify from '../../media/LogoClonify.png';
// Estilos
import estilosNavbar from './Navbar.module.css';
// React-icons
import { IoLogOutOutline } from 'react-icons/io5';
// Spinner
import spinner from '../../media/loaderConfirmacion.gif';

export function Navbar({ nombre }) {
    // Esatdo bonon logout
    const [showLogout, setShowLogout] = useState(false);
    // Estado componente confirmacion
    const [confirmacionLogout, setConfirmacionLogout] = useState(false);
    // Estado loader confirmacion
    const [loader, setLoader] = useState(false);

    // UseEffect
    useEffect(() => {
        // Verificamos que haya un usuario en el localStorage
        if (window.localStorage.getItem('usuarioSesionActual')) { // Si exite usuario...
            // Cambiamos el estado de showLogout a true para que se renderice ellogout
            setShowLogout(true);
        }
    }, []);

    // HandleOnClick
    function handleOnClick() {
        // Seteamos en true el estado de confirmacion logout
        setConfirmacionLogout(true);
    }

    // HandleOnClickDecicion
    function handleOnClickDesicion(desicion) {
        // Verificamos la desicion
        if (desicion) { // Si la desicion es true es usuario quiere cerrar sesion
            // Seteamos el estado del loader en true
            setLoader(true);

            // Borramos los datos del usuario del localStorage
            window.localStorage.removeItem('usuarioSesionActual');

            // Recargamos la pagina
            window.location.reload();
        } else { // Si el usuario no quiere salir
            // Seteamos en false el estado de mostrar componente de confirmacion
            setConfirmacionLogout(false);
        }
    }

    return (
        <div className={estilosNavbar.contenedorNavbar}>
            <div className={estilosNavbar.contenedorContenido}>
                <div className={estilosNavbar.contenedorMensajeBienvenida}>
                    {nombre &&
                        <span className={estilosNavbar.mensajeBienvenida}>
                            Bienvenido<br /> <span>{nombre}!</span>
                        </span>}
                </div>

                <div className={estilosNavbar.contenedorImage}>
                    <img src={logoClonify} alt='Logo clonify' className={estilosNavbar.logo} />
                </div>

                <div className={estilosNavbar.contenedorLogout}>
                    {showLogout &&
                        <button className={estilosNavbar.botonLogout} onClick={handleOnClick}>
                            <IoLogOutOutline /> Salir
                        </button>}
                </div>

            </div>

            {confirmacionLogout && (
                <div className={estilosNavbar.contenedorConfirmacionLogout}>
                    <div className={estilosNavbar.cartelConfirmacion}>
                        <span>Estas seguro que quieres salir?</span>

                        <div className={estilosNavbar.contenedorBotones}>
                            <div>
                                <button onClick={() => { handleOnClickDesicion(true) }}>SI</button>

                                <button onClick={() => { handleOnClickDesicion(false) }}>CANCELAR</button>
                            </div>

                            {loader ? <img src={spinner} width='30px' alt='Loader' /> : ''}
                        </div>
                    </div>
                </div>
            )}
        </div>);
}