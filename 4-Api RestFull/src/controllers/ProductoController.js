const Producto = require('../models/ClassProducto')
const dataProductos = require('../data/productos')

module.exports = {
    get : (req, res) => {  
        res.status(200)
        res.json(dataProductos).end()
    },
    id: (req, res) => {
        const id = Number(req.params.id)
        const producto = dataProductos.find(producto => producto.id === id)

        if(producto){
            res.status(200)
            res.json(producto).end()
        }
        else{
            res.status(404)
            res.json({ message: "Producto no encontrado"}).end()
        }

    },
    post: (req, res) => {
        const {title, price, thumbnail} = req.body
        const buscarUltimoId = dataProductos[dataProductos.length - 1].id
        const idNuevo = buscarUltimoId+1
        const productoNuevo = new Producto(title, price, thumbnail, idNuevo)

        try{
            dataProductos.push(productoNuevo)
            res.status(200)
            res.send(productoNuevo).end()
        }
        catch(e) {
            res.status(409)
            res.json({ message: "No se pudo crear la persona"}).end()
        }

    },
    put: (req, res) => {
        const id = Number(req.params.id)

        const {title, price, thumbnail} = req.body
        
        const productoNuevo = new Producto(title, price, thumbnail, id)
        console.log(productoNuevo);

        const busqueda = dataProductos.find(producto => producto.id === productoNuevo.id)
        console.log(busqueda);

        if(busqueda){
            const isLargeNumber = (element) => element == busqueda;
            const indice = dataProductos.findIndex(isLargeNumber)

            dataProductos[indice].title = productoNuevo.title
            dataProductos[indice].price = productoNuevo.price
            dataProductos[indice].thumbnail = productoNuevo.thumbnail
            
            res.status(200)
            res.json(productoNuevo).end()
        }
        else{
            res.status(404)
            res.json({ message: "No se pudo modificar ese id de producto"}).end()
        }
        
    },
    delete: (req, res) => {
        const id = Number(req.params.id)
        const productoBuscado = dataProductos.find(producto => producto.id === id)

            if(productoBuscado){
                const isLargeNumber = (element) => element == productoBuscado;
                const indice = dataProductos.findIndex(isLargeNumber)

                dataProductos.splice(indice, 1)
                res.status(200)
                res.json(productoBuscado).end()
            }
            else{
                res.status(404)
                res.json({ message: "No se puede eliminar ese id de producto"}).end()
            }
        } 
}