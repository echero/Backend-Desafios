const Contenedor = require('./models/ClassContenedor')
const {optionsMdb , optionsSql3} = require('./options/options')

const mysql = new Contenedor(optionsMdb, 'productos');
const sqlite3 = new Contenedor(optionsSql3, 'mensajes');

(async() =>{
    try {
        const existeTablaMensaje = await sqlite3.inicializarBase().schema.hasTable('mensajes')
        if (!existeTablaMensaje) {
            console.log('Se crea la tabla mensajes!')
            await sqlite3.inicializarBase().schema.createTable('mensajes', table => {
                table.increments('id').primary().notNull(),
                table.string('email',300).notNull(),
                table.string('fecha',100),
                table.string('texto',500).notNull()
            })
        }
        else{
            console.log('La Tabla Mensajes ya se encuentra Creada!')
        }

        const existeTablaProducto = await mysql.inicializarBase().schema.hasTable('productos')
        if (!existeTablaProducto) {
            console.log('Se crea la tabla productos!')
            await mysql.inicializarBase().schema.createTable('productos', table => {
                table.increments('id').primary().notNull(),
                table.string('title',50).notNull(),
                table.float('price').notNull(),
                table.string('thumbnail',500)
            })
        }
        else{
            console.log('La Tabla Productos ya se encuentra Creada!')
        }   
        await sqlite3.inicializarBase().destroy();
        await mysql.inicializarBase().destroy();
    } catch (error) {
        console.log(error)
    }

})();
