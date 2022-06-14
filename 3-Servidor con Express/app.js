//CLASE CONTENEDOR CON SU OBJETO INSTANCIADO
const Contenedor = require ('./ClaseContenedor')
const archivo = new Contenedor('productos')

//MODULO EXPRESS
const express = require('express')
const app = express()

//configuracion static
app.use(express.json())
app.use(express.urlencoded({extended: true}))


async function ver() {

    //DEVUELVE UN OBJETO POR ID o NULL 
    // const busquedaPorId = await archivo.getById(1)
    // console.log(busquedaPorId)

    //DEVUELVE UN ARRAY CON LOS OBJETOS OBJETOS
    // console.log(await archivo.getAll());

}

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