const {createLogger} = require("../utils/logWinston")
const logger = createLogger('PROD')

class ContenedorMongoDB {

    constructor(model){
        this.model = model;
    }

    async getAll() {
        try{
            const all = await this.model.find({});
            return all;
        }
        catch(error){
            return logger.log('error', `Hubo un error al traer todos los productos. ${error}`)
        }
    }

    async getById(id){
        return await this.model.findById(id)
    }

    async save(item) {
        try{
            const id = await this.model.create(item);
            return id;
        }
        catch(error){
            return logger.log('error', `Hubo un error al guardar el producto. ${error}`)
        }
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

    async delete(id){
        return await this.model.deleteOne({_id: id})
    }

    async update(idUser, data) {
        return await this.model.findOneAndUpdate({ _id: idUser },data);
    }

    async getAllById(idUser) {
        return await this.model.find({"idUser": idUser})
    }
}

module.exports = ContenedorMongoDB;
