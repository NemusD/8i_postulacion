const { Pool } = require('pg')

const config = {
    user: '',
    password: '',
    host: 'localhost',
    database: 'products',
    port: 5432
}

const pool = new Pool(config)

//Nuevos productos
async function newProducts(postObject) {
    const query = {
        text: 'INSERT INTO products(title, price, category, description, image) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [postObject.title, postObject.price, postObject.category, postObject.image]
    }   
    try {
        const result = await pool.query(query)
        return result.rows
    } catch (error) {
        console.error(error)
    }
};

//Lista de productos
async function listproducts() {
    const query = {
        text: 'SELECT * FROM products'
    }
    try {
        const result = await pool.query(query)
        return result.rows
    } catch (error) {
        console.log(error)
    }
};

//Eliminar productos
async function deleteProduct(id, title) {
    const query = {
        text: 'DELETE FROM products WHERE id = $1',
        values: [id]
    }

    const query2 = {
        text: 'DELETE FROM products WHERE title = $1',
        values: [title]
    }

    try {
        const result = await pool.query(query)
        const result2 = await pool.query(query2)
        return result
    } catch (error) {
        console.error(error)
    }
};

//Modificar productos
async function updateProducts(postObject) {
    const query = {
        text: 'SELECT title FROM products WHERE id = $1',
        values: [postObject.id]
    }

    const query2 = {
        text: 'UPDATE products SET title = $1, price = $2, category = $3, image = $4 WHERE id = $3 RETURNING *',
        values: [postObject.title, postObject.price, postObject.category, postObject.image]
    }
    try {
        const result = await pool.query(query)
        const result2 = await pool.query2(query2)
        return result

    } catch (error) {
        console.error(error)
    }
};

//Crear usuario
async function createUser(name, email, password, auth) {
    try{
        const result = await pool.query(`INSERT INTO createUsers (name, email, password, auth) VALUES (${name}, ${email}, ${password}, ${auth}) RETURNING *`);
        const newUser = result.rows[0];
        return newUser;
    } catch (ex) {
        console.log(ex);
        return ex;
    }
};

//Obtener usuarios

async function getUsers(){
    try{
        const result = await pool.query( "SELECT id, name, email, password, auth FROM createUsers RETURNING *");
        return result.rows;
    } catch (ex) {
        console.log(ex);
        return ex;
    }
};

//Habilitar o deshabilitar usuario
async function changeStatus(auth, id){
    try {
        const result = await pool.query(`UPDATE createUsers SET auth = ${auth} WHERE id = ${id} RETURNING *`);
        const successfulChange = result.rows[0];
        return successfulChange;
    } catch (ex) {
        console.log(ex);
        return ex;
    }
};

module.exports = { 
    createUser, 
    getUsers,
    changeStatus,
    newProducts, 
    listproducts, 
    updateProducts, 
    deleteProduct 
}