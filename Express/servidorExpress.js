const express = require('express');
const app = express()

//Servidor disponible
app.listen(3000, () => {
    console.log('localhost/servidorExpress OK')
})

//Crear ruta /servidorExpress en nuestro servidor por el puerto 3000
app.get('/servidorExpress', (req, res) => {
    res.send('servidor en express.js')
})

//Crear ruta /pruebaApi en nuestro servidor por el puerto 3000
app.get('/pruebaApi', (req, res) => {
    res.send('API funcionando')
})

//Para todo acceso que no tenga una ruta creada en nuestro servidor
app.get('*', (req, res) => {
    res.send('<center><h1>No existe la ruta</h1></center>')
})