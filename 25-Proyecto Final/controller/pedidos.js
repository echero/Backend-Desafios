const ContenedorMongoDB = require('../models/ClassMongo')
const {pedidos} = require('../models/ClassPedido')
const pedido = new ContenedorMongoDB(pedidos)

module.exports = {
    getAll : async (req, res) => {
        const idUser = req.params.id

        try {
            const busquedaIdUser = await pedido.getAllById(idUser)

            res.status(200)
            
            res.json(busquedaIdUser).end()

        } catch (error) {
            res.status(400)
            res.json({result: `ERROR: Los pedidos del usuario ${idUser} no se pueden mostrar, o no existen pedidos!`}).end()
        }
        
    }
}