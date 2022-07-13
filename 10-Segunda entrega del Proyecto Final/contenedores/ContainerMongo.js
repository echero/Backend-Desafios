const { MONGO_URI } = require('../config/globals')
const mongoose = require('mongoose')

class ContainerMongo {

  constructor(model) {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    })
    // , () => console.log('Connected')
    this.model = model;
  }
  
  async save(data) {
    let createData = await this.model.create(data)
    return createData._id
  }

  async getAll(){
    return await this.model.find()
  }

  async getById(id){
    return await this.model.findById(id)
  }
  
  async update(content, id){
    return await this.model.updateOne({_id: id}, {$set: content})
  }

  async delete(id){
    return await this.model.deleteOne({_id: id})
  }
  
}

module.exports = ContainerMongo;