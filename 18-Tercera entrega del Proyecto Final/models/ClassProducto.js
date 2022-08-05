const mongoose = require('mongoose');

const productos = new mongoose.Schema({
    title: { Type: String },
    description: { Type: String},
    code: { Type: String },
    price: { Type: String },
    thumbnail: { Type: String },
    stock: { Type: String }
});

module.exports = mongoose.model('productos', productos)
