const express = require('express');
const app = express()

const indexProductos = require('./routes/indexProductos')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views')) //especifican el directorio
app.set('view engine', 'ejs') //especifican el motor de plantilla


app.use('/productos', indexProductos)

app.listen(8080, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Servidor corriendo en el puerto 8080');
})