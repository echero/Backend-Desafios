const ProductosService = require('../services/productosService');
const ProductosDTO = require('../dtos/productosDTO');
const productosService = new ProductosService();

const getProductos = async (req, res) => {
  let result = await productosService.getProductos();
  let resultsDTO = result.map((producto) => new ProductosDTO(producto));
  res.send(resultsDTO);
};

const saveProducto = async (req, res) => {
  let producto = req.body;
  //validaciones...
  let result = await productosService.addProducto(producto);
  res.send(result);
};

module.exports = {getProductos, saveProducto};
