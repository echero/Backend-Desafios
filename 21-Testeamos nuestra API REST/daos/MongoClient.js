const mongoose = require('mongoose')

module.exports = class MongoClient {
  constructor() {
    this.connected = true;
    this.client = mongoose;
  }
  connect = async () => {
    try {
      await this.client.connect('mongodb+srv://chero:bnLXViGyrvV3WiLQ@cluster0.ro1fv.mongodb.net/clase40?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
