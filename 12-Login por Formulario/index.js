require('dotenv').config();
const express = require('express')
const handlebars = require('express-handlebars')
const {engine} = handlebars

const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const {optionsMdb} = require('./options/options')
const {connetionMG} = require('./DB/connectionMG')
const path = require('path');

const {sessionChecker} = require('./middleware/sessionChecker')
const {authLogin, authLoginPost, authLogout, dashboard} = require('./controller/authentication')
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
app.use('/api/productos-test', require('./routes/productos'));

app.engine(
	"hbs",
	engine({
		extname: ".hbs",
		defaultLayout: "./layout.hbs",
	})
);
  
app.set("views", "./views");
app.set("view engine", "hbs");

app.get('/', sessionChecker, (req, res) => {
	res.redirect("/login");
})
app.get('/login',sessionChecker,authLogin)
app.get('/logout',authLogout)
app.get('/dashboard',dashboard)
app.post('/login',authLoginPost);

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

httpServer.listen(process.env.PORT, () => console.log(`Server on Port ${process.env.PORT}`))