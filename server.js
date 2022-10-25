//Importaciones
const express = require('express');
const { ContenedorArchivo } = require('./container');

//Instanciación de la clase ContenedorArchivo
const products = new ContenedorArchivo('./productos.txt');


// Función que retorna un producto al azar
const shuffle = (array)=>{
    let random;
    for(let i = 0; i < array.length; i++){
        random = (array[Math.floor(Math.random()*array.length)]);
    }
    return random;
}

//Servidor
const server = express();
server.get('/', (req, res)=>{
    res.send('<h1>StreetWear Store</h1>')
})
server.get('/productos', async (req, res)=>{
    res.send(await products.getAll());
});

server.get('/productoRandom', async (req, res) =>{
    let result = await products.getAll();
    res.send(await shuffle(result));
});


function connect(port = 0){
    return new Promise((resolve, reject)=>{
        const serverConnected = server.listen(port, err => {
            if(err) reject(err)
            else resolve(serverConnected)
        })
    })
}

module.exports = {connect}



