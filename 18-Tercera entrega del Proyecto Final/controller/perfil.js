const ContenedorMongoDB = require('../models/ClassMongo')
const {User} = require('../models/ClassUser')
const user = new ContenedorMongoDB(User)

module.exports = {
    get : async (req, res) => {
        const idUsuario = req.params.id

        try {
            const busquedaUserPorId = await user.getById(idUsuario)
            
            res.status(200)
            
            res.json(busquedaUserPorId).end()

        } catch (error) {
            res.status(400)
            res.json({result: `ERROR: El carrito ${idCarrito} no tiene productos cargados, o no existe ese carrito!`}).end()
        }
        
    },
    put : async (req, res) => {
        const idUser = req.params.id
        const data = req.body

        try {
            const actualizarData = await user.update(idUser, data)
            res.status(200)
            res.json({message: `El usuario fue actualizado con exito!`}).end()
        } catch (error) {
            res.status(400)
            res.json({message: `No se pudo actualizar el usuario!`}).end()
        }
        
    }
}