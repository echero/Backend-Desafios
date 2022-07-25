const argv = require('yargs').argv
const PORT = argv.port
const core = require('os')

const informacion = (req, res) =>{
    const info = {
        argumentos: PORT,
        plataforma: process.platform,
        versionNode: process.version,
        memTotalReservada: process.memoryUsage().rss,
        path: process.execPath,
        pocessId: process.pid,
        carpetaProyecto: process.cwd(),
        cantProcesadores: core.cpus().length
    }
    
    res.render("pages/info", info)
}

module.exports = {informacion}