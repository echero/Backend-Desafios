module.exports = class UserDaoArray {
  constructor() {
    this.productos = [];
  }
  getAll = async () => {
    return this.productos;
  };
  save = async (producto) => {
    if (this.productos.length === 0) producto.id = 1;
    else producto.id = this.productos[this.productos.length - 1].id + 1;
    this.productos.push(user);
    return producto;
  };
}
