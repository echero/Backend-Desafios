const mongoose = require('mongoose');
require('dotenv').config();

const connetionMG = (async () => {
    try{
         mongoose.connect('mongodb+srv://chero:bnLXViGyrvV3WiLQ@cluster0.ro1fv.mongodb.net/chat?retryWrites=true&w=majority',{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
    } catch(e){
        console.log(e);
    }
})();

module.exports = connetionMG;