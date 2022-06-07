class Usuario {
    
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(nombreMascota) {
        this.mascotas.push(nombreMascota)
    }

    countMascotas() {
        return this.mascotas.length
    }

    adBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor})
    }

    getBookName() {
        let nombreLibros = []
        
        this.libros.forEach(libro => {
            nombreLibros.push(libro.nombre)
        })

        return nombreLibros
    }
}

const usuario1 = new Usuario("Ezequiel", "Cherone", [{nombre: "Cien años de Soledad", autor: "Garcia Marquez"}], ["Pepi", "Carli"])

console.log(usuario1.getFullName())

usuario1.addMascota("Napoleon")
usuario1.addMascota("Leo")

console.log(usuario1.mascotas)
console.log(usuario1.countMascotas())

usuario1.adBook("Rayuela","Cortazar")
usuario1.adBook("Vestiario","Cortazar")

console.log(usuario1.libros)
console.log(usuario1.getBookName())