const express = require('express');
const DBconnection =require('./config/db');
const cors = require('cors');

//Se crea el servidor
const app = express();

//Conectar a DB
DBconnection();
app.use(cors())

//habilitar datos JSON
app.use(express.json());

//Ruta
app.use('/api/products', require('./routes/product'));

app.listen(5001, () => {
    console.log('The server is runnig')
})