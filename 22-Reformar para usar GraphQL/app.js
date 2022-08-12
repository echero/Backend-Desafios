require('dotenv').config()
const express = require('express');
const {ApolloServer} = require('apollo-server-express')
const {typeDefs} = require('./typeDefs')
const {resolvers} = require('./resolvers')
const {connectDB} = require('./DB/db')

const app = express();

app.get('/', (req, res) => res.send('Welcome to my api'))

module.exports = app
connectDB()

async function start() {

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    })
    
    await apolloServer.start()

    apolloServer.applyMiddleware({app})

    app.use('*', (req, res) => res.status(400).send("Not found"))
    
    app.listen(process.env.PORT, () => {console.log('Server up');})
}

start()

