const argv = require('yargs').argv
const PORT = argv.port

const informacion = (req, res) =>{
    const info = {
        argumentos: PORT,
        plataforma: process.platform,
        versionNode: process.version,
        memTotalReservada: process.memoryUsage().rss,
        path: process.execPath,
        pocessId: process.pid,
        carpetaProyecto: process.cwd()
    }
    
    res.render("pages/info", info)
}

module.exports = {informacion}