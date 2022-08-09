const PersistenceFactory = require('../daos/persistenceFactory')

module.exports = class ProductosService {
  constructor() {
    this.productosDao;
    this.init();
  }

  init = async () => {
    this.productosDao = await PersistenceFactory.getPersistence();
  }

  getProductos = async () => {
    return await this.productosDao.getAll();
  }

  getProductosId = async (idProducto) => {
    return await this.productosDao.getById(idProducto);
  }

  addProducto = async (producto) => {
    return await this.productosDao.save(producto);
  }

  updateProducto = async (idProducto, producto) => {
    return await this.productosDao.update(idProducto, producto)
  }

  deleteProducto = async (idProducto) => {
    return await this.productosDao.delete(idProducto)
  }
}
