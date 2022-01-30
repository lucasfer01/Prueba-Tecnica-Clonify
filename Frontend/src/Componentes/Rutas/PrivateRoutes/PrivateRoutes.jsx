// React
import React from 'react';
// React-router-dom
import { Routes, Route } from 'react-router-dom';
// Componentes
import { AgregarPost } from '../../AgregarPost/AgregarPost';
import { EditarPost } from '../../EditarPost/EditarPost';
import { Home } from '../../Home/Home';

export function PrivateRoutes() {
    return (
        <div>
            {/* Estas rutas se van a renderizar si el usuario esat autenticado */}
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="editarPost/:postId" element={<EditarPost />} />
                <Route path="crearPost" element={<AgregarPost />} />
            </Routes>
        </div>
    );
}