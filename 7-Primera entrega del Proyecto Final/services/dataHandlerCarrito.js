const {convertDataProductJson} = require ('../services/dataHandlerProducto')
const Carrito = require('../models/ClassCarrito');
const fs = require("fs");

function convertDataCarritotJson() {
    const dataCarrito = fs.readFileSync('./data/carritos.txt', 'utf-8')
    const array = JSON.parse(dataCarrito)

    return array
}

function getFecha() {
    
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let fecha = day+'-'+month+'-'+year
    
    return fecha

}

function getCarritoId(array, id) {

    const busquedaPorId = array.find(i => i.id == id)

    return busquedaPorId
}

function getUltimoIdCarrito() {
    const dataCarrito = convertDataCarritotJson()
    const ultimoId = dataCarrito[dataCarrito.length - 1].id

    return ultimoId
}

function createCarritoNew() {
    const array = convertDataCarritotJson()

    let nuevoCarrito

    if(array.length === 0){
        nuevoCarrito = new Carrito(1, getFecha(), [])
    }
    else{
        const ultimoId= getUltimoIdCarrito()
        nuevoCarrito = new Carrito((ultimoId+1), getFecha(), [])
    }

    array.push(nuevoCarrito)

    fs.writeFileSync('./data/carritos.txt', JSON.stringify(array))

    return nuevoCarrito.id
}

function deleteCarrito(id) {
    const dataCarrito = convertDataCarritotJson()
    const busquedaPorId = getCarritoId(dataCarrito, id)

    if(busquedaPorId){

        const isLargeNumber = (element) => element == busquedaPorId
        const indice = dataCarrito.findIndex(isLargeNumber)

        dataCarrito.splice(indice, 1)

        fs.writeFileSync('./data/carritos.txt', JSON.stringify(dataCarrito))
    }

    return busquedaPorId
}

function getProductCarritoId(id) {

    const dataCarrito = convertDataCarritotJson()
    const busquedaPorId = getCarritoId(dataCarrito, id)

    return busquedaPorId
}

function addProductoAlCarritoPorId(idProducto){

    const dataCarrito = convertDataCarritotJson()
    const longitudCarrito = dataCarrito.length

    const dataProducto = convertDataProductJson()
    const busquedaPorIdProducto = dataProducto.find(i => i.id == idProducto)

    if(longitudCarrito !== 0 && busquedaPorIdProducto){

        dataCarrito[longitudCarrito-1].productos.push(busquedaPorIdProducto)

        fs.writeFileSync('./data/carritos.txt', JSON.stringify(dataCarrito))

    }

    return busquedaPorIdProducto
}

function deleteProductPorIdCarritoYIdProduct(idCarrito, idProducto) {

    const dataCarrito = convertDataCarritotJson()
    const busquedaPorIdCarrito = getCarritoId(dataCarrito, idCarrito)
    
    let busquedaPorIdProducto

    if(busquedaPorIdCarrito !== undefined){
        busquedaPorIdProducto = busquedaPorIdCarrito.productos.find(i => i.id == idProducto)
    }

    if(busquedaPorIdCarrito && busquedaPorIdProducto){
        
        const isLargeNumber = (element) => element == busquedaPorIdProducto
        const indice = busquedaPorIdCarrito.productos.findIndex(isLargeNumber)

        busquedaPorIdCarrito.productos.splice(indice, 1)

        fs.writeFileSync('./data/carritos.txt', JSON.stringify(dataCarrito))
    }

    return (busquedaPorIdCarrito && busquedaPorIdProducto) ? busquedaPorIdCarrito : busquedaPorIdProducto 
}


module.exports = {convertDataCarritotJson, getProductCarritoId, createCarritoNew, deleteCarrito, addProductoAlCarritoPorId, deleteProductPorIdCarritoYIdProduct}