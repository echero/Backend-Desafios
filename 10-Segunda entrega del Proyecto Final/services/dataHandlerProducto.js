const Producto = require('../models/productos')
const fs = require("fs");

function convertDataProductJson(){
    const dataProducto = fs.readFileSync('./data/productos.txt', 'utf-8')
    const array = JSON.parse(dataProducto)

    return array
}

function getProductId(array, id){

    const busquedaPorId = array.find(i => i.id == id)

    return busquedaPorId
}

function getUltimoId(){
    const dataProduct = convertDataProductJson()
    const ultimoId = dataProduct[dataProduct.length - 1].id

    return ultimoId
}

function fecha() {
    
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let fecha = day+'-'+month+'-'+year
    
    return fecha

}

function addProduct(nombre, descripcion, codigo, foto, precio, stock) {

    const dataProduct = convertDataProductJson()
    const ultimoId = getUltimoId()

    const nuevoProducto = new Producto((ultimoId+1), fecha(), nombre, descripcion, codigo, foto, precio, stock)

    dataProduct.push(nuevoProducto)

    fs.writeFileSync('./data/productos.txt', JSON.stringify(dataProduct))

    return dataProduct
}

function actualizarProducto(id, nombre, descripcion, codigo, foto, precio, stock){

    const dataProduct = convertDataProductJson()
    const busquedaPorId = getProductId(dataProduct ,id)
    
    if(busquedaPorId){
        busquedaPorId.nombre = nombre
        busquedaPorId.descripcion = descripcion
        busquedaPorId.codigo = codigo
        busquedaPorId.foto = foto
        busquedaPorId.precio = precio
        busquedaPorId.stock = stock

        fs.writeFileSync('./data/productos.txt', JSON.stringify(dataProduct))
    }

    return busquedaPorId
}

function eliminarProducto(id) {

    const dataProduct = convertDataProductJson()
    const busquedaPorId = getProductId(dataProduct ,id)

    if(busquedaPorId){
          
        const isLargeNumber = (element) => element == busquedaPorId
        const indice = dataProduct.findIndex(isLargeNumber)

        dataProduct.splice(indice, 1)

        fs.writeFileSync('./data/productos.txt', JSON.stringify(dataProduct))
    }

    return busquedaPorId
}

module.exports = {convertDataProductJson, getProductId, addProduct, actualizarProducto, eliminarProducto}