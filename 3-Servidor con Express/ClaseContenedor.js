const fs = require("fs");

class Contenedor {

    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
    }

    async save(objeto) {
        let array = await this.getAll()

        let ultimoId = array[array.length - 1].id

        objeto.id= ultimoId+1

        array.push(objeto)

        await fs.promises.writeFile(`${this.nombreArchivo}.txt`, JSON.stringify(array), (error) => {
            if(error) {
                console.log(error);
            }
        })
       
        return objeto.id
    }

    async getById(id) {

        try{

            const busqueda = await this.getAll()
            const resultado = busqueda.find(i => i.id == id)
            return (resultado== undefined) ? null : await resultado 

        }   
        catch (error) {

            console.log(error);

        }
    }

    async getAll() {

        try {
            let arrayData = await fs.promises.readFile(`${this.nombreArchivo}.txt`, 'utf-8')
            return await JSON.parse(arrayData)
        }
        catch (error) { 
            console.log(error);
        }

    }

    async deleteById(id) {
        try {

            const array = await this.getAll()
            const arrayModificado = array.filter((i) => i.id != id)

            await fs.promises.writeFile(`${this.nombreArchivo}.txt`, JSON.stringify(arrayModificado))

        } catch (error) {

            console.log(error)

        }
    }

    async deleteAll() {

        const arrayVacio = []

        await fs.promises.writeFile(`${this.nombreArchivo}.txt`, JSON.stringify(arrayVacio) , (error) => {

            if(error) {
                console.log(error);
            }

        })

    }
}

module.exports = Contenedor