const { ContainerFirestore } = require('../../contenedores/ContainerFirestore')

class CarritoDaoFirestore extends ContainerFirestore {
  constructor(){
    super('carrito')
    // this.id = 0
    // this.checkId()
  }

  async getAll(){
    let result = await this.collection.get()
    result = result.docs.map(doc => ({ 
      id: doc.id,
      data: doc.data()
    }))
    return result
  }

  async insertProducto(idCarrito, producto) {
    const carrito = await this.getById(idCarrito)
    const productos = carrito.data.productos

    productos.push(producto)

    return await this.update({productos}, idCarrito)
	}

  async deleteProducto(idCarrito, idProducto) {
		
		const carrito = await this.getById(idCarrito)
    const productos = carrito.data.productos
		const index = productos.findIndex(p => p.id == idProducto);

		productos.splice(index, 1);

		return await this.update({productos}, idCarrito)
	}
}

module.exports = { CarritoDaoFirestore }
