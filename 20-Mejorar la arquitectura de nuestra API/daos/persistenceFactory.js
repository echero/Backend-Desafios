const config = require('../config/config.js');

module.exports = class PersistenceFactory {
  static getPersistence = async () => {
    switch (config.app.persistence) {
      case 'ARRAY':
        let { default: productosDaoArray } = await import('../daos/productosDaoArray.js');
        return new productosDaoArray();
      case 'FILE':
        let { default: productosDaoFile } = await import('../daos/productosDaoFile.js');
        return new productosDaoFile();
      case 'DB':
        let { default: productosDaoDB } = await import('../daos/productosDaoDB.js');
        return new productosDaoDB();
    }
  };
}
