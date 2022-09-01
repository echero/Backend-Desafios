const mongoose = require('mongoose');
require('dotenv').config();
const {createLogger} = require("../utils/logWinston")
const logger = createLogger('PROD')

const connetionMG = (async () => {
    try{
         mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
    } catch(e){
        logger.log('error', `Error al conectarse a la base de datos ${e}`)
    }
})();

module.exports = connetionMG;