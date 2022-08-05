module.exports = class ProductosDTO {
  constructor(producto) {
    this.id = producto.id;
    this.full_name = `Titulo: ${producto.nombre} - Codigo: ${producto.codigo}`;
    this.caracteristicas =`Precio: $${producto.precio} - Stock: ${producto.stock}`;
  }
}
