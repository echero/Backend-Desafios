const {convertDataProductJson, getProductId, addProduct, actualizarProducto, eliminarProducto} = require('../services/dataHandlerProducto')

module.exports = {
    get : (req, res) => {

        const id = req.params.id
        const array= convertDataProductJson()

        if (id === undefined) {
            res.status(200)
            res.json(array).end()    
        }
        else if (id !== undefined){
            const busquedaPorId = getProductId(array, id)
            
            if (busquedaPorId){
                res.status(200)
                res.json(busquedaPorId).end() 
            }
            else{
                res.status(400)
                res.json({message: 'No existe ese id de producto... no se puede visualizar!'}).end() 
            }
        }           
    },
    post : (req, res) => {

        const {nombre, descripcion, codigo, foto, precio, stock} = req.body
        
        const addProducto = addProduct(nombre, descripcion, codigo, foto, precio, stock)

        res.status(200)
        res.json(addProducto).end()
    },
    put : (req, res) => {

        const id = req.params.id
        const {nombre, descripcion, codigo, foto, precio, stock} = req.body
        const busquedaPorId = actualizarProducto(id, nombre, descripcion, codigo, foto, precio, stock)
        
        if(busquedaPorId){
            res.status(200)
            res.json(busquedaPorId).end()
        }
        else{
            res.status(400)
            res.json({message:  "No existe ese id de producto... no se puede actualizar!"})
        }
    },
    delete : (req, res) => {
        const id = req.params.id
        const busquedaPorId = eliminarProducto(id)

        if(busquedaPorId){

            res.status(200)
            res.json(busquedaPorId).end()
        }
        else{
            res.status(400)
            res.json({message:  "No existe ese id de producto... no se puede eliminar!"}).end()
        }
    }
}