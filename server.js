const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const http = require('http')
const fs = require('fs')
const url = require('url')

//const db = require('./assets/db/migrations')
const { createUser, getUsers, changeStatus, newProducts, listproducts, updateProducts, deleteProduct } = require('./db/index')

const { Pool } = require ('pg')
const { decode } = require('punycode')

const server = http-createSercer(async (req, res) => {
    //Cargar la página
    if(req.url === '/' && req.method === 'GET') {
        fs.readFile('./postulacion_8i/views/Home.vue', (error,file) => {
            if(error) console.log(error)

            res.writeHead(200, { 'Content-Type':'text/html' })
            res.end(file)
        })
    }
    // Hacer query para agregar un producto
    else if (req.url === '/products' && req.method === 'POST') {
        let body
        req.on('data', datos => body = JSON.parse(datos))
        req.on('end', async () => {
            const datos = await newProducts (body)

            res.writeHeader(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(datos))
        })
    }
    // Hacer query para obtener el listado de productos
    else if (req.url === '/products' && req.method === 'GET') {
        const products = await listproducts()
        res.writeHeader(200, { 'Content-Type':'application/json' })
        res.end(JSON.stringify(products))
    }
    // Hacer query para eliminar un producto
    else if (req.url.startsWith('/products?id') && req.method === 'DELETE') {
        const { id, title } = url.parse(req.url, true).query
        await deleteProduct(id, title)
        
        res.writeHeader(200, { 'Content-Type' :'application/json' })
        res.end()
    }
    // Hacer la query para actualizar los datos de un producto
    else if (req.url == '/products' && req.method === 'PUT') {
        let body
        req.on('data', datos => body = JSON.parse(datos))
        req.on('end', async () => {
            const datos = await updateProducts(body)

            res.writeHeader(200, { 'Content-Type': 'application/json' })
            res.end()
        })
    }

})

//Verificar que este el servidor operativo
server.listen(3000, () => console.log('Servidor 3000 funcionando'))
app.use('/', express.static(__dirname + '/views'))

//Configuración verificación de usuarios
const secretKey = 'llave'

app.get('/login', (req, res) => {
    const { email, password } =req.query
    console.log(req.query)

    const user = saveUsers.find((user) => user.email == email && user.password == password);
    if (user) {
        const userToken = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 120,
            data: user,
        },
        secretKey
        )
        res.send(`'<a href="/user?token=${userToken}"><p>Ingreso Usuario</p></a> Bienvenido, ${email}... <script>localStorage.setItem('userToken', JSON.stringify("${userToken}"))</script>`)
    }else {
        res.send('Usuario Incorrecto')
    }
})

app.get('/App', (req,res) => {
    let { token } = req.query;
    jwt.verify(token, secretKey, (err, decoded) => {
        err ?
        res.status(401).send({
            error: '401 no autorizado',
            message: err.message
        })
        : res.send (`Bienvenido usuario validado ${decoded.data.email}`)
    })
})