const express = require('express')
const {engine} = require('express-handlebars')

const app = express()

const indexProductos = require('./routes/indexProductos')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'public')))

app.engine(
    'hbs',
    engine({
        extname: 'hbs',
        defaultLayout: 'productos.hbs'
    })
)

app.set('views', path.join(__dirname, 'views')) //especifican el directorio
app.set('view engine', 'hbs') //especifican el motor de plantilla

app.use('/productos', indexProductos)

app.listen(8080, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Servidor corriendo en el puerto 8080');
})