document.addEventListener("DOMContentLoaded", () => {
    loadInitialData();
});

async function loadInitialData() {
    const response = await fetch("/productos")
    const products = await response.json()
    renderProducto(products)

    const productosCarrito = await generarCarrito()
    renderCarrito(productosCarrito)

    const perfil = await generarPerfil()
    renderPerfil(perfil)

    const tablaPedidos = await generarPedidos() 
    renderPedidos(tablaPedidos)
}

async function renderProducto(productos) {
    const template = await fetch('./plantilla/productos.hbs')
    const textTemplate = await template.text()
    const functionTemplate = Handlebars.compile(textTemplate)
    const html = functionTemplate({productos})

    document.querySelector('#productos').innerHTML = html

    const botonAgregar = document.querySelectorAll('.agregar')

    botonAgregar.forEach(button => {
        button.addEventListener('click', (e) =>{
            agregarProducto(e.target, e.target.getAttribute("data-id"))
        })
    })
}

async function agregarProducto (button, id, rebuildView = false) {
    let userId = sessionStorage.getItem('userId');
    let cartId = localStorage.getItem(`cartId_${userId}`);

    let data = {
        id: id
    }

    const response = await fetch(`/carrito/${cartId}/productos`, 
    { method: "POST", 
    body: JSON.stringify(data), 
    headers: {"Content-type": "application/json; charset=UTF-8"}})

    const mensaje = await response.json();

    alertaToasty(JSON.stringify(mensaje.result))

    loadInitialData()
}

const generarCarrito = async () => {
    let userId = sessionStorage.getItem('userId');
    let cartId = localStorage.getItem(`cartId_${userId}`);

    let data = {
        id: userId
    }
    
    if (cartId === null) {
        const response = await fetch("/carrito",
        {method: "POST",
        body: JSON.stringify(data), 
        headers: {"Content-type": "application/json; charset=UTF-8"}})

        const id = await response.json();
        localStorage.setItem(`cartId_${userId}`,id)
        cartId = id;
    }
    
    const response = await fetch(`/carrito/${cartId}/productos`);
    const products = await response.json();
    return products;
}

async function renderCarrito(productos) {
    const template = await fetch('./plantilla/carrito.hbs')
    const textTemplate = await template.text()
    const functionTemplate = Handlebars.compile(textTemplate)
    const html = functionTemplate({productos})

    document.querySelector('.modal-body').innerHTML = html
    document.querySelector('#cantProduct').innerHTML = productos.length

    const botonEliminar = document.querySelectorAll('.eliminar');

    botonEliminar.forEach(button => {
        button.addEventListener('click', (e)=> {
        eliminarProducto(e.target.getAttribute("data-id"));
        });
    });
}

async function eliminarProducto(id) {
    let userId = sessionStorage.getItem('userId');
    let cartId = localStorage.getItem(`cartId_${userId}`);

    const response = await fetch(`/carrito/${cartId}/productos/${id}`, { method: "DELETE"})

    const mensaje = await response.json();

    alertaToasty(JSON.stringify(mensaje.message))

    const productosCarrito = await generarCarrito();
    renderCarrito(productosCarrito);

}

const btnTerminarCompra = document.querySelector('#terminarCompra')

btnTerminarCompra.addEventListener('click', (e)=> {
    terminarCompra()
})

async function terminarCompra() {
    let userId = sessionStorage.getItem('userId');
    let cartId = localStorage.getItem(`cartId_${userId}`);

    const responseEmail = await fetch(`/carrito/${cartId}/usuario/${userId}`, {method: "PUT"})
    const mensajeEmail = await responseEmail.json()

    const response = await fetch(`/carrito/${cartId}`, { method: "DELETE"})
    const mensaje = await response.json();
    localStorage.removeItem(`cartId_${userId}`)

    alertaToasty(JSON.stringify(mensaje.result))

    location.reload()
}

async function generarPerfil() {
    let userId = sessionStorage.getItem('userId');
    
    const response = await fetch(`/perfil/${userId}`);
    const user = await response.json();
    
    return user;
}

async function renderPerfil(user) {
    let userId = sessionStorage.getItem('userId');
    const template = await fetch('./plantilla/perfil.hbs')
    const textTemplate = await template.text()
    const functionTemplate = Handlebars.compile(textTemplate)
    const html = functionTemplate(user)

    document.querySelector('#perfil').innerHTML = html

    const perfilForm = document.getElementById('perfilForm');

    perfilForm.addEventListener('submit', function (e) {
        let formdata = new FormData(perfilForm)
        let data = {
            username: formdata.get('username'),
            edad: formdata.get('edad'),
            direccion: formdata.get('direccion'),
            telefono: formdata.get('telefono'), 
            email: formdata.get('email'), 
        }
        fetch(`/perfil/${userId}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => alertaToasty(JSON.stringify(response.json()))) 
    })
}

const generarPedidos = async () => {
    let userId = sessionStorage.getItem('userId');
    
    const response = await fetch(`/pedidos/${userId}`);
    const pedidos = await response.json();
    return pedidos;
}

async function renderPedidos(pedidos) {
    const union = []
    for (let i = 0; i < pedidos.length; i++) {
        let pedido = pedidos[i]
        const productos = pedido.productos;
        const suma = productos.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
        pedido.suma = suma
        union.push(pedido)
    }
   
    const template = await fetch('./plantilla/pedidos.hbs')
    const textTemplate = await template.text()
    const functionTemplate = Handlebars.compile(textTemplate)
    const html = functionTemplate({union})

    document.querySelector('#pedidos').innerHTML = html

}


//Alerta toasty

function alertaToasty (texto,gravity='top',position='right') {
    
    let background = '#706f85, #363456';
    
    Toastify({
        text: texto,
        duration: 3000,
        gravity,
        position,
        style: {
            background: `linear-gradient(to right, ${background})`
          }
      }).showToast();
}