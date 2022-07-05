db = connect('mongodb://localhost/ecommerce');

db.mensajes.insertMany( [
{
    email: 'chero@gmail.com',
    fecha: new Date().toLocaleString(),
    texto: 'Hola'
},
{
    email: 'chero@gmail.com',
    fecha: new Date().toLocaleString(),
    texto: 'Como estan?'
},
{
    email: 'chero@gmail.com',
    fecha: new Date().toLocaleString(),
    texto: 'Tuve un problema con el producto "Regla"'
},
{
    email: 'chero@gmail.com',
    fecha: new Date().toLocaleString(),
    texto: 'Necesitaria que me lo cambien'
},
{
    email: 'chero@gmail.com',
    fecha: new Date().toLocaleString(),
    texto: 'Para cuando me lo podrian enviar?'
},
{
    email: 'chero@gmail.com',
    fecha: new Date().toLocaleString(),
    texto: 'Gracias'
},
{
    email: 'chero@gmail.com',
    fecha: new Date().toLocaleString(),
    texto: 'Espero su respuesta'
},
{
    email: 'chero@gmail.com',
    fecha: new Date().toLocaleString(),
    texto: 'Saludos'
},
{
    email: 'chero@gmail.com',
    fecha: new Date().toLocaleString(),
    texto: 'Buen finde!'
},
{
    email: 'chero@gmail.com',
    fecha: new Date().toLocaleString(),
    texto: 'Atentamente Ezequiel'
}
] )

db.productos.insertMany( [
    {
        title: 'Escuadra',
        price: 12,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    },
    {
        title: 'Calculadora',
        price: 580,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
    },
    {
        title: 'Globo Terraqueo',
        price: 900,
        thumbnail: ''
    },
    {
        title: 'Punzon de madera',
        price: 1280,
        thumbnail: 'https://libreriaslevalle.com/70-home_default/punzon-escolar-con-mango-de-madera-sifap.jpg'
    },
    {
        title: 'Transportador',
        price: 1700,
        thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_864694-MLA49065824945_022022-W.jpg'
    },
    {
        title: 'Regla',
        price: 2300,
        thumbnail: 'https://libreriaslevalle.com/1237-home_default/regla-15-cm-transparente-pizzini.jpg'
    },
    {
        title: 'Pizarron',
        price: 2860,
        thumbnail: 'http://d2r9epyceweg5n.cloudfront.net/stores/854/520/products/11-4283a362f687a92ee316017321045794-640-0.jpg'
    },
    {
        title: 'Caja de Marcadores',
        price: 3350,
        thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_715072-MLA46910550072_072021-W.jpg'
    },
    {
        title: 'Block de hojas Rivadavia',
        price: 4320,
        thumbnail: 'https://www.libreriaascorti.com.ar/3875-large_default/repuesto-rivadavia-a4-288-hojas-rayadas.jpg'
    },
    {
        title: 'Bancos de colegio',
        price: 4990,
        thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_613917-MLA48007580752_102021-W.jpg'
    }
 ] )

//MUESTRA POR CONSOLA LA BUSQUEDA DE MENSAJES Y SU CANTIDAD
printjson(db.mensajes.find())
printjson(db.mensajes.estimatedDocumentCount())

//MUESTRA POR CONSOLA LA BUSQUEDA DE PRODUCTOS Y SU CANTIDAD
printjson(db.productos.find())
printjson(db.productos.estimatedDocumentCount())

//AGREGA UN PRODUCTO MAS EN LA COLECCION DE PRODUCTOS
db.productos.insertOne({title: 'Mochila',
                price: 4500,
                thumbnail: 'https://d368r8jqz0fwvm.cloudfront.net/35385-product_lg/mochila-escolar-rouge-20lts.jpg'})

//CONSULTA POR NOMBRE ESPECIFICO
printjson(db.productos.find({title: 'Regla'}))

//LISTAR PRODUCTOS CON PRECIO MENOR A 1000
printjson(db.productos.find({price: {$lt: 1000}}))

//LISTAR PRODUCTOS CON PRECIO ENTRE 1000 a 3000
printjson(db.productos.find({$and:[{price:{$gte: 1000}},{price:{$lte: 3000}}]}))

//LISTAR PRODUCTOS CON PRECIO MAYOR A 3000
printjson(db.productos.find({price: {$gte: 3000}}))

//CONSULTA QUE TRAE EL NOMBRE DEL TERCER PRODCUTO MAS BARATO 
printjson(db.productos.find({},{title:1}).skip(2).limit(1).sort({price:1}))

//ACTUALIZAR TODOS LOS PRODUCTOS CON UN CAMPO STOCK 100
db.productos.updateMany({}, {$set: {"stock": 100}})

//ACTUALIZAR TODOS LOS PRODUTOS MAYORES A 4000 EL STOCK EN 0
 db.productos.updateMany({price: {$gte: 4000}}, {$set: {"stock": 0}})

//ELIMINAR TODOS LOS PRODUCTOS CON PRECIO MENORES A 1000
db.productos.deleteMany({price: {$lt: 1000}})

//CREA UN USUARIO DE SOLO LECTURA
db.createUser({user: "pepe", pwd: "asd456", roles: [{role: "read", db: "ecommerce"}]})