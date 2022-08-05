const mongoose = require('mongoose')

const collectionName = 'productos';

const schema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  codigo: String,
  precio: Number,
  stock: Number
});

module.exports = {collectionName, schema };
