const express = require('express')
const fs = require('fs')

const app = express()

//configuracion static
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/productos", (req, res) => {
    
    const productos = fs.readFileSync('productos.txt', 'utf8')

    res.send(JSON.parse(productos))
    
})

app.get("/productoRandom", (req, res) => {

    const productos = JSON.parse(fs.readFileSync('productos.txt', 'utf8'))

    let numeroRandom = Math.random()*productos.length

    res.send(productos[parseInt(numeroRandom)])
    
})

app.listen(8080, () => {
    console.log('Servidor ejecuatandose en el puerto 8080')
})