const dirname = require("../utils/utils");
const fs = require('fs');

module.exports = class UsersDaoFile {
  constructor() {
    this.path = dirname + '/files/productos.json';
    this.init();
  }
  init = async () => {
    if (!fs.existsSync(this.path)) await fs.promises.writeFile(this.path, JSON.stringify([]));
  };
  readFile = async () => {
    let data = await fs.promises.readFile(this.path, 'utf-8');
    return JSON.parse(data);
  };
  getAll = async () => {
    return await this.readFile();
  };
  save = async (producto) => {
    let productos = await this.readFile();
    if (productos.length === 0) producto.id = 1;
    else producto.id = productos[productos.length - 1].id + 1;
    productos.push(producto);
    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));
    return producto;
  };
}
