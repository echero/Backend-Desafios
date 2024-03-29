const ContenedorMongoDB = require('../models/ClassMongo')
const Producto = require('../models/ClassProducto')
const productos = new ContenedorMongoDB(Producto)

module.exports = {
    get : async (req, res) => {
        const { id } = req.params
        let producto 

        try {
            if (id === undefined) {
                producto = await productos.getAll()   
            }else{
                producto = await productos.getById(id)
            }
            res.status(200)
            res.json(producto).end()       
        } catch (err) {
            res.status(404)
            res.json({ status: 'ERROR: No se puede traer los productos!' }).end()
        }
    },
    post : async (req, res) => {
        let newProducto = req.body
        
        try {
            newProducto = await productos.save(newProducto)
            res.status(200)
            res.json(newProducto).end()
        } catch (err) {
            res.status(404)
            res.json({ result: 'ERROR: No se pudo crear el producto' }).end()
        }
    
    },
    put : async (req, res) =>{
        const id= req.params.id
        let newdata = req.body
        
        try {
            let productoActualizado = await productos.update(newdata, id)
            res.status(200)
            res.json({result: `Se modifico el id ${id} correctamente!`}).end() 
        } catch (err) {
            res.status(404)
            res.json({ result: `ERROR: No se actualizo el id ${id}!` }).end()
        }
    },
    delete : async (req, res) => {
        const id= req.params.id

        try{
            let productoEliminar = await productos.delete(id)
            res.status(200)
            res.json({result: `Se elimino el id ${id} correctamente!`}).end() 
        }
        catch(err){
            res.status(404)
            res.json({ result: `ERROR: No se pudo eliminar el id ${id}!`}).end()
        }
        
    }
}