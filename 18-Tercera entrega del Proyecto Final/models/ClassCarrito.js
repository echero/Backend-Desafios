const mongoose = require('mongoose')

const CarritoSchema = new mongoose.Schema({
	date: { type: Date, required: true},
	estado: { type: String, required: true },
	productos: { type: Array, required: true}
})
const carritos = mongoose.model('carritos', CarritoSchema)

module.exports = {carritos}