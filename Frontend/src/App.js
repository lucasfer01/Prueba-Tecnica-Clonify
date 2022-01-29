// React
import React, { useEffect, useState } from 'react';
// Axios
import axios from 'axios';
// Urls
import { USER_BACK_URL } from './enviroment';
// Rutas
import { NotLoggedIn } from './Componentes/Rutas/NotLoggedIn/NotLoggedIn';
import { LoggedIn } from './Componentes/Rutas/LoggedIn/LoggedIn';

function App() {
  // Estado usuarios
  const [user, setUser] = useState(null); // Estado inicial: null

  // UseEffect
  useEffect(() => {
    // Verificamos que haya un usuario en el localStorage
    const userLocalStorage = window.localStorage.getItem('userSession');

    if (userLocalStorage) {
      // Guardamos el usuario del localStorage en una variable
      const usuarioJSON = JSON.parse(userLocalStorage);

      // Hacemos peticion al back con el id del usuario en localStorage
      axios.get(`${USER_BACK_URL}/${usuarioJSON.user_id}`)
        .then(usuario => setUser(usuario.data)) // Seteamos el estado de usuario con la respuesta
        .catch(error => console.log(error));
    }
  }, []);

  return (
    <div className="App">
      {user ? // Si el estado de user tienealgo significa que hay una sesion iniciada y puede acceder a las rutas
        <LoggedIn />
        :
        // Si el estado es null se renderiza el componente de inicio de sesion
        <NotLoggedIn />}
    </div>
  );
}

export default App;
