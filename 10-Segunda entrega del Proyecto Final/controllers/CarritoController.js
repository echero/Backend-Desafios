const dotenv = require('dotenv');
dotenv.config()

const { CarritoDao, ProductoDao } = require('../daos/daos')

const carritoDao = new CarritoDao()
const productoDao = new ProductoDao()

module.exports = {
    post : async (req, res) => {

        let newCarrito = {
            "date": new Date(),
            "productos": []
        }

        try {
            newCarrito._id = await carritoDao.save(newCarrito)
            res.status(200)
            res.json(`Se creo exitosamente el carrito: ${newCarrito._id}`).end()
        } catch (err) {
            res.status(404)
            res.json({ result: 'ERROR: No se pudo crear el carrito' }).end()
        }
    
    },
    delete : async (req, res) => {
        const id= req.params.id

        try{
            let carritoEliminar = await carritoDao.delete(id)
            res.status(200)
            res.json({result: `Se elimino el carrito ${id} correctamente!`}).end() 
        }
        catch(err){
            res.status(404)
            res.json({ result: `ERROR: No se pudo eliminar el id ${id}!`}).end()
        }
        
    },
    get_productos : async (req, res) => {
        const idCarrito = req.params.id

        try {
            const busquedaProductosPorIdCarrito = await carritoDao.getById(idCarrito)

            res.status(200)
            if (process.env.ENGINE == 'MONGODB') {
                res.json(busquedaProductosPorIdCarrito.productos).end()
            }else{
                res.json(busquedaProductosPorIdCarrito.data.productos).end()
            }

        } catch (error) {
            res.status(400)
            res.json({result: `ERROR: El carrito ${idCarrito} no tiene productos cargados, o no existe ese carrito!`}).end()
        }
        
    },
    post_producto : async (req, res) => {
        const idProducto = req.params.id

        try {
            let ultimoIdCarrito
            const agregarProductoAlCarrito = await productoDao.getById(idProducto)
            const carritos = await carritoDao.getAll()

            if (process.env.ENGINE == 'MONGODB') {
                ultimoIdCarrito = carritos[carritos.length-1]._id
            }else{
                ultimoIdCarrito = carritos[carritos.length-1].id
            }

            const insertProducto = await carritoDao.insertProducto(ultimoIdCarrito, agregarProductoAlCarrito)

            res.status(200)
            res.json({result: `Se agrego correctamente el producto ${idProducto} en el carrito!`}).end()
        } catch (error) {
            res.status(400)
            res.json({result: `ERROR: No se guardo el producto ${idProducto} en el carrito!`}).end()
        }

    },
    delete_producto : async (req, res) => {
        const idCarrito = req.params.id
        const idProducto = req.params.id_prod 

        try {
            const eliminarProdutoDelCarrito = await carritoDao.deleteProducto(idCarrito, idProducto)
            res.status(200)
            res.json({message: `El producto ${idProducto} fue eliminado con exito!`}).end()
        } catch (error) {
            res.status(400)
            res.json({message: `El carrito ${idCarrito}, o el producto ${idProducto} no existe en el carrito!`}).end()
        }

    }
}