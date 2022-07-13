const ContainerMongo = require('../../contenedores/ContainerMongo')
const { productos } = require('../../models/productos')

class ProductoDaoMongo extends ContainerMongo {
	constructor(){
		super(productos)
	}

}

module.exports = { ProductoDaoMongo }