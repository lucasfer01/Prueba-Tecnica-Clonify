// Express 
const { Router } = require('express');
// Creamos Router
const rutas = Router();

// rutas
rutas.use('/user', (req, res) => {
    res.send('funciona');
})

// Exportamos las rutas
module.exports = {
    rutas
}