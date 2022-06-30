const {getProductCarritoId, createCarritoNew, deleteCarrito, addProductoAlCarritoPorId, deleteProductPorIdCarritoYIdProduct} = require ('../services/dataHandlerCarrito')

module.exports = {
    post : (req, res) => {
        const idCarritoNuevo = createCarritoNew()

        res.status(200)
        res.json(idCarritoNuevo).end()
    },
    delete : (req, res) => {
        const id = req.params.id
        const busquedaPorId= deleteCarrito(id)

        if(busquedaPorId){
            res.status(200)
            res.json({message: 'Carrito eliminado'}).end()
        }
        else{
            res.status(400)
            res.json({message: 'No existe ese id de carrito... no se pudo eliminar!'}).end()
        }
    },
    get_productos : (req, res) => {
        const idCarrito = req.params.id
        const busquedaPorId = getProductCarritoId(idCarrito)

        if(busquedaPorId){
            res.status(200)
            res.json(busquedaPorId.productos).end()
        }
        else{
            res.status(400)
            res.json({message: `El carrito ${idCarrito} no tiene productos cargados, o no existe ese carrito!`}).end()
        }
    },
    post_producto : (req, res) => {
        const idProducto = req.params.id
        const agregarProductoAlCarrito = addProductoAlCarritoPorId(idProducto)

        if(agregarProductoAlCarrito){
            res.status(200)
            res.json({message: `El producto ${idProducto} fue agregado con exito!`}).end()
        }
        else{
            res.status(400)
            res.json({message: `El producto ${idProducto} no existe, o no tiene creado un carrito!`}).end()
        }


    },
    delete_producto : (req, res) => {
        const idCarrito = req.params.id
        const idProducto = req.params.id_prod 

        const eliminarProdutoDelCarrito = deleteProductPorIdCarritoYIdProduct(idCarrito, idProducto)

        if(eliminarProdutoDelCarrito){
            res.status(200)
            res.json({message: `El producto ${idProducto} fue eliminado con exito!`}).end()
        }
        else{
            res.status(400)
            res.json({message: `El carrito ${idCarrito}, o el producto ${idProducto} no existe en el carrito!`}).end()
        }
    }
}