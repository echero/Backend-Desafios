const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')


const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const productos = require('./data/productos')
const mensajes = require('./data/mensajes')
const Producto = require('./models/ClassProducto') 
const Mensaje = require('./models/ClassMensaje') 

app.use(express.static('public'))

httpServer.listen(8080, () => console.log(`Server on Port ${8080}`))

io.on('connection', (socket) => {
	console.log('Se conecto un usuario!')
	socket.emit('productos', productos)

	socket.on('agregarProducto', data => {
        let producto = new Producto(data.title, data.price, data.thumbnail)
		productos.push(producto)
		io.sockets.emit('productos', productos)
	})

	socket.emit('mensajes', mensajes)

	socket.on('agregarMensaje', data => {
        let mensaje = new Mensaje(data.email, data.fecha, data.texto)
		mensajes.push(mensaje)
		io.sockets.emit('mensajes', mensajes)
	})
})
