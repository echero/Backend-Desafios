require('dotenv').config();
const express = require('express')
const handlebars = require('express-handlebars')
const {engine} = handlebars
const passport = require('passport')
const argv = require('yargs').argv
const cluster = require('cluster')
const core = require('os')
const PORT = argv.port || 8080
const MODO = argv.modo || 'FORK'

const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const {optionsMdb} = require('./options/options')
const {connetionMG} = require('./DB/connectionMG')
const path = require('path');
const initializePassport  = require('./controller/passport.config')
const authRouter = require('./routes/authentication')
const infoRuter = require('./routes/info')
const randomsRouter = require('./routes/randoms')

const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


const Contenedor = require('./models/ClassContenedor')
const ContenedorMongoDB = require('./models/ClassMongo')
const Producto = require('./models/ClassProducto') 
const Normalizr = require('./models/ClassNormalizr') 

app.use(
    session({
      //Seteo de cookie en Mongo
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      }),

      key: 'user_sid',
      secret: 'c0d3r',
      resave: false,
      saveUninitialized: true,
      cookie: {maxAge: 600000},
    })
)

const productos = new Contenedor(optionsMdb, 'productos')
const mensajes = new ContenedorMongoDB()
const normalizr = new Normalizr()

app.use(express.static(path.join(__dirname ,'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
initializePassport.initializePassport();
app.use(passport.initialize())
app.use(passport.session())
app.use('/api/productos-test', require('./routes/productos'));
app.use('/', authRouter)
app.use('/info', infoRuter)
app.use('/api/randoms', randomsRouter)

app.engine(
	"hbs",
	engine({
		extname: ".hbs",
		defaultLayout: "./layout.hbs",
	})
);
  
app.set("views", "./views");
app.set("view engine", "hbs");



io.on('connection', async socket => {
	console.log('Se conecto un usuario!')

	socket.emit('productos', await productos.getAll())

	socket.on('agregarProducto', async data => {
        let producto = new Producto(data.title, data.price, data.thumbnail)
		await productos.save(producto)
		io.sockets.emit('productos', await productos.getAll())
	})

	const mensajesMG = await mensajes.getAll()
	const mensajesNormalizr = normalizr.getDataNormalizer(mensajesMG)

	socket.emit('mensajes', mensajesNormalizr)

	socket.on('agregarMensaje', async mensaje => {
		try {
            await mensajes.save(mensaje)    
        } catch (error) {
            console.log(error);
        }

		const mensajesMG = await mensajes.getAll()
		const mensajesNormalizr = normalizr.getDataNormalizer(mensajesMG)

		io.sockets.emit('mensajes', mensajesNormalizr)
	})
})

if (MODO !== 'FORK') {
  console.log(MODO);
    if (cluster.isPrimary) {
      console.log(`Primary process ${process.pid} is running`);
      for (let i = 0; i < core.cpus().length; i++) {
        cluster.fork()      
      }
    }

    cluster.on('exit', (worker) =>{
      console.log(`Worker ${worker.process.pid} died`)
      cluster.fork()
      console.log(`Worker restored`);
    })
}else{
  httpServer.listen(PORT, () => console.log(`Server on Port ${PORT}, process ID: ${process.pid}`))
}

