// React
import React, { useEffect, useState } from 'react';
// Rutas
import { NotLoggedIn } from './Componentes/Rutas/NotLoggedIn/NotLoggedIn';
import { LoggedIn } from './Componentes/Rutas/LoggedIn/LoggedIn';
// React-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Componentes
import { Landing } from './Componentes/Landing/Landing';
import { PrivateRoutes } from './Componentes/Rutas/PrivateRoutes/PrivateRoutes';
import { Navbar } from './Componentes/Navbar/Navbar';

function App() {
  // Estado usuarios
  const [user, setUser] = useState(null); // Estado inicial: null

  // UseEffect
  useEffect(() => {
    // Verificamos que haya un usuario en el localStorage
    const userLocalStorage = window.localStorage.getItem('usuarioSesionActual');

    // Si hay algo entonces hay un sesion iniciada
    if (userLocalStorage) {
      // Seteamos el usuario en true
      setUser(true);
    }
  }, []);

  return (
    <div className="App">
      {/* Hacemos que el navbar se renderice en toda la aplicacion */}
      <Navbar />

      {/*------------------ Proteccion de rutas ----------------------*/}
      <Router>
        {/* Si no hay nada en el esatado user el usuario no esta autenticado */}
        <Routes>
          <Route path='/'
            element={
              <NotLoggedIn isAutenticated={user} >
                <Landing />
              </NotLoggedIn>} />

          {/* Si hay algo en la estado user el usuario esta autenticado */}
          <Route path='/*'
            element={
              <LoggedIn isAutenticated={user}>
                <PrivateRoutes />
              </LoggedIn>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
