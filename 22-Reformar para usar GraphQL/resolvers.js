const Film = require('./models/Films')

const resolvers = {

    Query: {
        getAllFilms: async () => {
            const films = await Film.find()
            return films
        },
        getFilm: async (_, {id}) => {
            const film = await Film.findById(id)
            return film
        }
    },
    Mutation: {
        createFilm: async(_, args) => {
            const {titulo, anio, duracion} = args.film
            const newFilm = new Film({titulo, anio, duracion})
            await newFilm.save()
            return newFilm
        },
        deleteFilm: async (_, {id}) => {
            await Film.findByIdAndDelete(id)
            return 'El fil fue eliminado!'
        },
        updateFilm: async (_, {id, film}) => {
            const filmUpdated = await Film.findByIdAndUpdate(id, {$set: film}, {new: true})
            return filmUpdated
        }
    }
}

module.exports = {resolvers}