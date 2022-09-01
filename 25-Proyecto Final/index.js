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
const PORT = process.env.PORT || 8080
const MODO = argv.modo || 'FORK'
global.ADMINISTRADOR = true;

const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const {connetionMG} = require('./DB/connectionMG')
const path = require('path');
const initializePassport  = require('./controller/passport.config')
const authRouter = require('./routes/authentication')
const producto = require('./routes/producto')
const carrito = require('./routes/carrito')
const perfil = require('./routes/perfil')
const pedidos = require('./routes/pedidos.routes')
const middleware = require('./middleware/validacionRoutes')

const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

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
      cookie: {maxAge: 1200000},
    })
)

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

app.use('/', authRouter)
app.use('/productos', producto)
app.use('/carrito', carrito)
app.use('/perfil', perfil)
app.use('/pedidos', pedidos)

app.use('*', middleware.validarRoutes);

app.engine(
	"hbs",
	engine({
		extname: ".hbs",
		defaultLayout: "./layout.hbs",
	})
);
  
app.set("views", "./views");
app.set("view engine", "hbs");

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

