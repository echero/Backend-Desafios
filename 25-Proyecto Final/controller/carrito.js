const ContenedorMongoDB = require('../models/ClassMongo')
const Producto = require('../models/ClassProducto')
const {carritos} = require('../models/ClassCarrito')
const {User} = require('../models/ClassUser')
const {pedidos} = require('../models/ClassPedido')
const { enviarEmailAdministradorPedido } = require('../utils/envioEmail')
const productos = new ContenedorMongoDB(Producto)
const carrito = new ContenedorMongoDB(carritos)
const user = new ContenedorMongoDB(User)
const pedido = new ContenedorMongoDB(pedidos)

module.exports = {
    post : async (req, res) => {
        let newCarrito = {
            "idUser": req.body.id,
            "productos": []
        }

        try {
            newCarrito = await carrito.save(newCarrito)
            res.status(200)
            res.json(newCarrito._id).end()
        } catch (err) {
            res.status(404)
            res.json({ result: 'ERROR: No se pudo crear el carrito' }).end()
        }
    
    },
    delete : async (req, res) => {
        const id= req.params.id

        try{
            let carritoConfirmado = await carrito.getById(id)

            let newPedido = {
                "idCarrito": carritoConfirmado._id,
                "idUser": carritoConfirmado.idUser,
                "productos": carritoConfirmado.productos
            }
            
            let pedidoG = await pedido.save(newPedido)
            let carritoEliminar = await carrito.delete(id)
            
            res.status(200)
            res.json({result: `Se realizo la compra exitosamente!`}).end() 
        }
        catch(err){
            res.status(404)
            res.json({ result: `ERROR: No se pudo eliminar el id ${id}!`}).end()
        }
        
    },
    get_productos : async (req, res) => {
        const idCarrito = req.params.id

        try {
            const busquedaProductosPorIdCarrito = await carrito.getById(idCarrito)

            res.status(200)
            
            res.json(busquedaProductosPorIdCarrito.productos).end()

        } catch (error) {
            res.status(400)
            res.json({result: `ERROR: El carrito ${idCarrito} no tiene productos cargados, o no existe ese carrito!`}).end()
        }
        
    },
    post_producto : async (req, res) => {
        const idProducto = req.body.id
        try {
            let ultimoIdCarrito
            const agregarProductoAlCarrito = await productos.getById(idProducto)

            const car = await carrito.getById(req.params.id)
            
            const insertProducto = await carrito.insertProducto(car, agregarProductoAlCarrito)

            res.status(200)
            res.json({result: `Se agrego exitosamente el producto!`}).end()
        } catch (error) {
            res.status(400)
            res.json({result: `ERROR: No se guardo el producto ${idProducto} en el carrito!`}).end()
        }

    },
    delete_producto : async (req, res) => {
        const idCarrito = req.params.id
        const idProducto = req.params.id_prod 

        try {
            const eliminarProdutoDelCarrito = await carrito.deleteProducto(idCarrito, idProducto)
            res.status(200)
            res.json({message: `El producto fue eliminado con exito!`}).end()
        } catch (error) {
            res.status(400)
            res.json({message: `El carrito ${idCarrito}, o el producto ${idProducto} no existe en el carrito!`}).end()
        }

    },
    put_carrito : async (req, res) => {
        const idCarrito = req.params.id
        const idusuario = req.params.id_usuario
        
        const busquedaProductosPorIdCarrito = await carrito.getById(idCarrito)
        const usuario = await user.getById(idusuario)

        try {
            await enviarEmailAdministradorPedido(`Nuevo Pedido de ${usuario.username} - ${usuario.email}`, busquedaProductosPorIdCarrito.productos)
            res.status(200)
            res.json({message: `El email fue enviado con exito!`}).end()
        } catch (error) {
            res.status(400)
            res.json({message: `No se pudo enviar el email del Pedido!`}).end()
        }
        
    }
}