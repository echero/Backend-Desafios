const mongoose = require('mongoose')
const productosModel = require('../models/productos.js')

module.exports = class ProductosDaoDB {
  constructor() {
    this.model = mongoose.model(productosModel.collectionName, productosModel.schema);
  }
  getAll = async () => {
    let results = await this.model.find();
    return results;
  };
  save = async (producto) => {
    let result = await this.model.create(producto);
    return result;
  };
}
