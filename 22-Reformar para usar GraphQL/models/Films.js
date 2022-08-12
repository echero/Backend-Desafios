const {Schema, model}= require('mongoose')

const filmsSchema = new Schema({
    titulo: {type: String, required: true},
    anio: {type: String, required: true},
    duracion: { type: String, required: true} 
})

module.exports = model('Films', filmsSchema)