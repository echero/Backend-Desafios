const mongoose = require('mongoose')

const CarritoSchema = new mongoose.Schema({
	idUser: { type: String, required: true },
	productos: { type: Array, required: true}
},{
    timestamps: true,
    versionKey: false
})
const carritos = mongoose.model('carritos', CarritoSchema)

module.exports = {carritos}