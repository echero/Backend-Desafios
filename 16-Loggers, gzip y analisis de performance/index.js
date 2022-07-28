require('dotenv').config();
const express = require('express')
const handlebars = require('express-handlebars')
const {engine} = handlebars
const passport = require('passport')
const argv = require('yargs').argv
const cluster = require('cluster')
const core = require('os')
const compression = require('compression')
const {createLogger} = require("./utils/logWinston")
const logger = createLogger('PROD')
const PORT = argv.port || 8080
const MODO = argv.modo || 'FORK'

const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
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

const ContenedorMongoDB = require('./models/ClassMongo')
const Normalizr = require('./models/ClassNormalizr') 
const Mensaje = require('./models/ClassMensaje');
const Producto = require('./models/ClassProducto')

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

const productos = new ContenedorMongoDB(Producto)
const mensajes = new ContenedorMongoDB(Mensaje)
const normalizr = new Normalizr()

app.use(express.static(path.join(__dirname ,'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(compression({
  level:9
}))
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
  logger.log('info', `Se conecto un usuario!`)

	socket.emit('productos', await productos.getAll())

	socket.on('agregarProducto', async producto => {
    try {
		  await productos.save(producto)
    } catch (error) {
      logger.log('error', `El producto no se pudo guardar en la base de datos. Error: ${error}`)
    }
		  io.sockets.emit('productos', await productos.getAll())
	})

	const mensajesMG = await mensajes.getAll()
	const mensajesNormalizr = normalizr.getDataNormalizer(mensajesMG)

	socket.emit('mensajes', mensajesNormalizr)

	socket.on('agregarMensaje', async mensaje => {
		try {
            await mensajes.save(mensaje)    
        } catch (error) {
          logger.log('error', `El mensaje no se pudo guardar en la base de datos. Error: ${error}`)
        }

		const mensajesMG = await mensajes.getAll()
		const mensajesNormalizr = normalizr.getDataNormalizer(mensajesMG)

		io.sockets.emit('mensajes', mensajesNormalizr)
	})
})

if (MODO !== 'FORK') {
  console.log(MODO);
    if (cluster.isPrimary) {
      logger.log('info', `Primary process ${process.pid} is running`)
      for (let i = 0; i < core.cpus().length; i++) {
        cluster.fork()      
      }
    }

    cluster.on('exit', (worker) =>{
      logger.log('info', `Worker ${worker.process.pid} died`)
      cluster.fork()
      logger.log('info', `Worker restored`)
    })
}else{
  httpServer.listen(PORT, () => logger.log('info', `Server on Port ${PORT}, process ID: ${process.pid}`))
}

