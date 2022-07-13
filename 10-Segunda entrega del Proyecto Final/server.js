const dotenv = require('dotenv');
const express = require('express');

dotenv.config()
const app = express();

const PORT = process.env.PORT;

global.ADMINISTRADOR = true;

const indexProducto = require('./routes/indexProducto')
const indexCarrito = require('./routes/indexCarrito')
const middleware = require('./middleware/validacionRoutes')

app.use(express.json())
app.use(express.urlencoded())

app.use('/api/productos', indexProducto)
app.use('/api/carrito', indexCarrito)

app.use('*', middleware.validarRoutes);

const serv = app.listen(PORT, () => {
    console.log('Escuchando en el puerto', serv.address().port);
})
serv.on('error', err => console.error('Error', err))