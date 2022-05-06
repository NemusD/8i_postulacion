const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const http = require('http')
const fs = require('fs')
const url = require('url')
//const db = require('./db/migrations')
const { createUser, getUsers, changeStatus, newProducts, listproducts, updateProducts, deleteProduct } = require('./assets/db')
const axios = require('axios')
const { Pool } = require ('pg')
const { next } = require('process')

const server = http.createServer(async (req, res) => {
    const { name, email, password } = url.parse(req.url,true).query;
    let user = {
        name,
        email,
        password
    };
    let data = JSON.parse(fs.readFileSync("products.json", "utf-8"));
    let users = data.users;
    if (req.url.startsWith("/Home")) {
        users.push(user);
        fs.writeFileSync("products.json", JSON.stringify(data));
        res.end();
    }
    if (req.url.startsWith("App")) {
        axios
        .get(`https://fakestoreapi.com/products`)
        .then((response) => response.data.results[0])
        .catch((e) => {
            res.end(e.message);
        });
    }
    function getData(id) { 
        var setting = {
            url: `https://fakestoreapi.com/products/${id}`,
            method: "GET",
        };
        $.ajax(setting).done(function (response) { 
            $("#title").text(response.title);
            $("#price").text(`Price: ${response.price} [USD]`);
            $("#category").text(`Category: ${response.category}`);
            $("#description").text(`Description: ${response.description}`);
            $("#img").attr("src", response.image["front_default"]);
            statspoker(response);
        })
    }
    //Cargar la página
    if(req.url === '/' && req.method === 'GET') {
        fs.readFile('./views/index.html', (error,file) => {
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

app.get('/Login', (req, res) => {
    const { email, password } = req.query
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

app.get('/login', (req,res) => {
    let { token } = req.query;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                error: '401 no autorizado',
                message: err.message,
            });
        } else {
            res.send (`Bienvenido ${users.name} has sido validado ${decoded.data.email}`)
            res.redirect(__dirname + '/views/App.vue')
        }
            req.token = token
            next()
    })
})