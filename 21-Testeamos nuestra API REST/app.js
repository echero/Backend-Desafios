const express = require('express') ;
const productosRouter = require('./routers/productosRouter')
const MongoClient = require('./daos/MongoClient') ;

const app = express();
let client = new MongoClient();
client.connect();

app.use(express.json());
app.use('/productos', productosRouter);

const server = app.listen(3000, () => console.log('Now listening...'));

module.exports = {server}
