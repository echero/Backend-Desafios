const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const {optionsMdb , optionsSql3} = require('./options/options')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


const Contenedor = require('./models/ClassContenedor')
const Producto = require('./models/ClassProducto') 
const Mensaje = require('./models/ClassMensaje') 

const productos = new Contenedor(optionsMdb, 'productos')
const mensajes = new Contenedor(optionsSql3, 'mensajes')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())

io.on('connection', async socket => {
	console.log('Se conecto un usuario!')

	socket.emit('productos', await productos.getAll())

	socket.on('agregarProducto', async data => {
        let producto = new Producto(data.title, data.price, data.thumbnail)
		await productos.save(producto)
		io.sockets.emit('productos', await productos.getAll())
	})

	socket.emit('mensajes', await mensajes.getAll())

	socket.on('agregarMensaje', async data => {
        let mensaje = new Mensaje(data.email, data.fecha, data.texto)
		await mensajes.save(mensaje)
		io.sockets.emit('mensajes', await mensajes.getAll())
	})
})

httpServer.listen(8080, () => console.log(`Server on Port ${8080}`))