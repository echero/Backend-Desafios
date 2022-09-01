const mongoose = require('mongoose')

const PedidoSchema = new mongoose.Schema({
    idCarrito: {type: String, required: true},
	idUser: { type: String, required: true },
	productos: { type: Array, required: true}
},{
    timestamps: true,
    versionKey: false
})
const pedidos = mongoose.model('pedidos', PedidoSchema)

module.exports = {pedidos}