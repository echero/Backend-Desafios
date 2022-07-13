const ContainerMongo = require('../../contenedores/ContainerMongo')
const { carritos } = require('../../models/carritos')

class CarritoDaoMongo extends ContainerMongo {
	constructor(){
		super(carritos)
	}

	async insertProducto(idCarrito, producto) {
		return await this.model.updateOne({_id: idCarrito},{$push:{productos: producto}})
	}

	async deleteProducto(idCarrito, idProducto) {
		
		const carrito = await this.getById(idCarrito)
		let productos = carrito.productos
		const index = productos.findIndex(p => p._id == idProducto);
		productos.splice(index, 1);
		const productosAct = carrito.productos = productos;

		return await this.model.updateOne({_id: idCarrito},{$set:{productos: productosAct}})
	}

}

module.exports = { CarritoDaoMongo }