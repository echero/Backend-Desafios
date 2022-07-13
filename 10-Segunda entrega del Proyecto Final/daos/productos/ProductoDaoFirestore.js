const { ContainerFirestore } = require('../../contenedores/ContainerFirestore')

class ProductoDaoFirestore extends ContainerFirestore {
  constructor(){
    super('productos')
  }

}

module.exports = { ProductoDaoFirestore }
