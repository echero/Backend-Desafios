const dotenv = require('dotenv');
dotenv.config()

const { CarritoDaoMongo } = require('./carrito/CarritoDaoMongo')
const { CarritoDaoFirestore } = require('./carrito/CarritoDaoFirestore')

const { ProductoDaoMongo } = require('./productos/ProductoDaoMongo')
const { ProductoDaoFirestore } = require('./productos/ProductoDaoFirestore')

let ProductoDao;
let CarritoDao;

if (process.env.ENGINE == 'MONGODB'){
    console.log('MongoDB elegido');
    ProductoDao = ProductoDaoMongo;
    CarritoDao = CarritoDaoMongo;
}else {
    console.log('Firebase elegido');
    ProductoDao = ProductoDaoFirestore;
    CarritoDao = CarritoDaoFirestore;
}

module.exports = {ProductoDao, CarritoDao}