//CLASE CONTENEDOR CON SU OBJETO INSTANCIADO
const Contenedor = require ('./ClaseContenedor')
const archivo = new Contenedor('productos')

//MODULO EXPRESS
const express = require('express')
const app = express()

//configuracion static
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => { 
    res.send(
        `<div>
            <h2 style="text-align:center;font-family:Arial;font-weight:bold;margin-top:3%;">Servidor con Express</h2>
            <h3 style="text-align:center;font-family:Arial;font-weight:bold;margin-top:3%;">Repositorio GitHub</h3>
            <h4 style="text-align:center;font-family:Arial;font-weight:bold;">https://github.com/echero/Backend-Desafios/tree/main/3-Servidor%20con%20Express</h4>
            <h3 style="text-align:center;font-family:Arial;font-weight:bold;margin-top:3%;">Repositorio Glitch</h3>
            <h4 style="text-align:center;font-family:Arial;font-weight:bold;">https://api-prodcutos-03.glitch.me </h4>
            <h4 style="text-align:center;font-family:Arial;font-weight:bold;">https://glitch.com/edit/#!/api-prodcutos-03</h4>
        </div>`)
})

app.get("/productos", async (req, res) => {
    
    const productos = await archivo.getAll()

    res.send(productos)
    
})

app.get("/productoRandom", async (req, res) => {

    const productos = await archivo.getAll()

    let numeroRandom = Math.random()*productos.length
     
    res.send(productos[parseInt(numeroRandom)])
    
})

app.listen(8080, () => {
    console.log('Servidor ejecuatandose en el puerto 8080')
})