const {gql} = require('apollo-server-express')

const typeDefs = gql`

    type Film {
        id: ID
        titulo: String
        anio: String
        duracion: String 

    }

    type Query {
        getAllFilms: [Film]
        getFilm(id: ID): Film
    }

    input FilmInput {
        titulo: String
        anio: String
        duracion: String
    }

    type Mutation {
        createFilm(film: FilmInput): Film
        deleteFilm(id: ID): String
        updateFilm(id: ID, film: FilmInput): Film
    }
`

module.exports = {typeDefs}