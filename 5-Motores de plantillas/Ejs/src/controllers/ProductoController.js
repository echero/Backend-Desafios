const Producto = require('../models/ClassProducto')
const dataProductos = require('../data/productos')

module.exports = {
    get : (req, res) => {  
        res.status(200)
        let tagliane = "No hay productos cargados!"
        res.render('pages/productos', {dataProductos: dataProductos, tagliane: tagliane})
    },
    post: (req, res) => {
        const {title, price, thumbnail} = req.body
        const buscarUltimoId = dataProductos[dataProductos.length - 1].id
        const idNuevo = buscarUltimoId+1
        const productoNuevo = new Producto(title, price, thumbnail, idNuevo)

        try{
            dataProductos.push(productoNuevo)
            res.status(200)
            res.redirect('/')
        }
        catch(e) {
            res.status(409)
            res.json({ message: "No se pudo crear la persona"}).end()
        }

    }
}