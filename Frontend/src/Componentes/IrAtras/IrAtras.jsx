// React
import React from 'react';
// React-router-dom
import { Link } from 'react-router-dom';
// React-icon
import { BiArrowBack } from 'react-icons/bi';
// Estilos
import estilosIrAtras from './IrAtras.module.css';

export function IrAtras() {
    return (
        <Link className={estilosIrAtras.botonIrAtras} to='/home'>
            <BiArrowBack fill='#fff' size='1.7rem'/>
        </Link>
    );
}