const express = require('express') ;
const productosRouter = require('./routers/productosRouter')
const MongoClient = require('./daos/MongoClient') ;

const app = express();
const server = app.listen(3000, () => console.log('Now listening...'));
let client = new MongoClient();
client.connect();

app.use(express.json());
app.use('/productos', productosRouter);
