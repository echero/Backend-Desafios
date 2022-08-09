const ProductosService = require('../services/productosService');
const ProductosDTO = require('../dtos/productosDTO');
const productosService = new ProductosService();

const getProductos = async (req, res) => {
  let result = await productosService.getProductos();
  let resultsDTO = result.map((producto) => new ProductosDTO(producto));
  res.status(200).send(resultsDTO);
};

const getProductosId = async (req, res) => {
  let idProducto = req.params.id
  try {
    let result = await productosService.getProductosId(idProducto);
    let resultadoTDO = new ProductosDTO(result)
    res.status(200).send(resultadoTDO);
    
  } catch (error) {
    res.status(404)
  }
};

const saveProducto = async (req, res) => {
  let producto = req.body;
  try {
    let result = await productosService.addProducto(producto);
    res.status(200).send(result);
  } catch (error) {
    res.status(200).send(error);
  }
  
};

const updateProducto = async (req, res) => {
  let idProducto = req.params.id
  let producto = req.body;
  
  try {
    let result = await productosService.updateProducto(idProducto, producto);
    res.status(200).send({ message: 'Producto actualizado'});
  } catch (error) {
    res.status(400).json(error);
  }
  
}

const deleteProducto = async (req, res) => {
  let idProducto = req.params.id

  try {
    let result = await productosService.deleteProducto(idProducto)
    res.status(200).send({ message: 'Producto eliminado'});
  } catch (error) {
    res.status(400).json(error);
  }
  
}

module.exports = {getProductos, saveProducto, updateProducto, deleteProducto, getProductosId};
