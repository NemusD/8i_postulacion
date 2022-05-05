const http = require('http')
const fs = require('fs')
const url = require('url')
const db = require('./db/migrations')
const { newProducts, listproducts, updateProducts, deleteProduct } = require('./db/index')

const { Pool } = require ('pg')

const server = http-createSercer(async (req, res) => {
    //Cargar la página
    if(req.url === '/' && req.method === 'GET') {
        fs.readFile('./views/Home.vue', (error,file) => {
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
    // Login usuario
    if(req.url == '/login' && req.method == 'GET'){
        const result = await db.getUser
    }
})

//Verificar que este el servidor operativo
server.listen(3000, () => console.log('Servidor 3000 funcionando'))