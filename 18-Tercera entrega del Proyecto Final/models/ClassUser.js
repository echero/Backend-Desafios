const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true },
    edad: { type: Number, required: true},
    direccion: { type: String, required: true },
    telefono: { type: String, required: true },
    imagen: { type: String, required: false },
    password: { type: String, required: true },
    email: { type: String, required: true }
})

const User = mongoose.model("user", UserSchema)

module.exports = { User }