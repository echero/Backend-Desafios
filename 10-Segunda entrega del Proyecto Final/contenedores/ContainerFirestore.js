var admin = require("firebase-admin");
const {FIRESTORE_FILE} = require('../config/globals')
var serviceAccount = require(FIRESTORE_FILE);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecommerce-874b2-default-rtdb.firebaseio.com"
});

const db = admin.firestore()

class ContainerFirestore {
  constructor(collection){
    this.collection = db.collection(collection)
    // console.log(`Base conectada con la collection ${collection}`)
  }

  async save(document){
    let doc = this.collection
    let item = await doc.add(document)
    return item.id
  }

  async getAll(){
    let result = await this.collection.get()
    result = result.docs.map(doc => ({ 
      id: doc.id,
      data: doc.data()
    }))
    return result
  }

  async getById(id){
    let result = await this.collection.get()
    result = result.docs.map(doc => ({ 
      id: doc.id,
      data: doc.data()
    }))
    let item = result.find(elem => elem.id == id)
    return item
  }

  async delete(id){
    let doc = this.collection.doc(`${id}`)
    let item = doc.delete()
    return ({ status: 'Deleted' })
  }

  async update(content, id){
    let doc = this.collection.doc(`${id}`)
    let item = await doc.update(content)
    return item
  }
}

module.exports = { ContainerFirestore }
