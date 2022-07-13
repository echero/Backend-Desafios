const mongoose = require('mongoose')

const ProductoSchema = new mongoose.Schema({
	nombre: { type: String, required: true, max: 100 },
	descripcion: { type: String, required: true, max: 200 },
	codigo: { type: String, required: true, max: 50 },
	foto: { type: String, required: true },
	precio: { type: Number, required: true },
    stock: { type: Number, required: true }
})

const productos = mongoose.model('productos', ProductoSchema)

module.exports = {productos}