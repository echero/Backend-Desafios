# Proyecto en GraphQL

1. Correr "npm install" para instalar todas las dependencias

2. Generar el .env tomando como ejemplo el .env.sample

3. Ejecutar el nodemon o "node app.js" para levantar el servidor

4. Ingresar la siguiente url en el navegador para entrar a GraphQL  http://localhost:3000/graphql

5. Hacer click el boton "query your server"

## Querys GraphQL

1. getAll 

query {
  getAllFilms{
    id
    titulo
    anio
    duracion
  }
}

2. getById

query {
 getFilm(id: "<ID A BUSCAR>"){
   titulo
   anio
   duracion
 }
}

3. create

mutation {
  createFilm(
    film: {
        titulo: "<DATO>", 
        anio: "<DATO>", 
        duracion: "<DATO>"
    }  
    ){
      id
      titulo
      anio
      duracion
    }

}

4. update

mutation {
updateFilm(
  id: "<ID A BUSCAR>"
  film: {
    titulo: <DATO A CAMBIAR>
    }
    ) {
      titulo
      anio
      duracion
    }
}

5. delete

mutation{
  deleteFilm(id: "<ID A ELIMINAR>")
}