const {connect} = require('mongoose')

const connectDB = async () => {
    try {
        await connect(process.env.MONGODB_URI)
        console.log("Mogon connect!");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {connectDB}