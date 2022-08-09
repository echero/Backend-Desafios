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

  getById = async (idProducto) => {
    let results = await this.model.findOne({_id: idProducto});
    return results;
  };

  save = async (producto) => {
    let result = await this.model.create(producto);
    return result;
  };

  update = async (idProducto, producto) => {
    let result = await this.model.updateOne({_id: idProducto},{$set:{nombre: producto.nombre, descripcion: producto.descripcion, codigo: producto.codigo, precio: producto.precio, stock: producto.stock}})
    return result
  }

  delete = async (idProducto) => {
    let result = await this.model.deleteOne({_id: idProducto})
    return result
  }
}
