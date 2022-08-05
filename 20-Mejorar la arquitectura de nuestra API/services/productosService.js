const PersistenceFactory = require('../daos/persistenceFactory')

module.exports = class ProductosService {
  constructor() {
    this.productosDao;
    this.init();
  }
  init = async () => {
    this.productosDao = await PersistenceFactory.getPersistence();
  };
  getProductos = async () => {
    return await this.productosDao.getAll();
  };
  addProducto = async (producto) => {
    return await this.productosDao.save(producto);
  };
}
