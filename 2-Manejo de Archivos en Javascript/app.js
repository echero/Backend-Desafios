const Contenedor = require ('./ClaseContenedor')

const archivo = new Contenedor('productos')

async function ver() {
    
    // //GUARDA UN NUEVO OBJETO CON UN ID MAYOR AL QUE ESTABA Y DEVUELVE EL ID
    const idNuvoObjeto = await archivo.save({ title: 'Buzo', price: 6000, thumbnail: 'https://www.ansilta.com/img/articulos/2021/01/buzo_primo_3_13_imagen9.jpg', id: 0})
    console.log(idNuvoObjeto)

    //DEVUELVE UN OBJETO POR ID o NULL 
    const busquedaPorId = await archivo.getById(1)
    console.log(busquedaPorId)

    //DEVUELVE UN ARRAY CON LOS OBJETOS OBJETOS
    console.log(await archivo.getAll());

    //ELIMINA POR ID
    await archivo.deleteById(1)

    //ELIMINA TODO LOS PRODUCTOS DEL TXT
    await archivo.deleteAll()

}

ver()
