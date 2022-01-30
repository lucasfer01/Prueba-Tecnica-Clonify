// React
import React from 'react';
// Logo
import logoClonify from  '../../media/LogoClonify.png';
// Estilos
import estilosNavbar from './Navbar.module.css';

export function Navbar() {
    return (
        <div className={estilosNavbar.contenedorNavbar}>
            <img src={logoClonify} alt='Logo clonify' className={estilosNavbar.logo} />
        </div>);
}