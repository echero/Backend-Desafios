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

    async save(item) {
        try{
            const id = await this.model.create(item);
            return id;
        }
        catch(error){
            return logger.log('error', `Hubo un error al guardar el producto. ${error}`)
        }
    }
}

module.exports = ContenedorMongoDB;
