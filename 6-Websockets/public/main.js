const socket = io()

const agregarProductos = document.getElementById('agregarProducto')
const agregarMensajes = document.getElementById('agregarMensaje')

agregarProductos.addEventListener('submit', (e) => {
	e.preventDefault()

	const producto = {
		title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value,
	}

	socket.emit('agregarProducto', producto)

    agregarProductos.reset()
})

async function renderProducto(productos) {
    const template = await fetch('./plantilla/productos.hbs')
    const textTemplate = await template.text()
    const functionTemplate = Handlebars.compile(textTemplate)
    const html = functionTemplate({productos})

    document.querySelector('#productos').innerHTML = html
}
socket.on('productos', renderProducto)

agregarMensajes.addEventListener('submit', (e) => {
	e.preventDefault()

	const mensaje = {
		email: document.getElementById('email').value,
        fecha: new Date().toLocaleString(),
        texto: document.getElementById('texto').value,
	}

	socket.emit('agregarMensaje', mensaje)
    document.getElementById('texto').value = ''
})

async function renderMensaje(mensajes) {
    const template = await fetch('./plantilla/mensajes.hbs')
    const textTemplate = await template.text()
    const functionTemplate = Handlebars.compile(textTemplate)
    const html = functionTemplate({mensajes})

    document.querySelector('#mensajes').innerHTML = html
}
socket.on('mensajes', renderMensaje)
