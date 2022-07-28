const {fork} = require('child_process')

const numRandoms = (req, res) => {
    let num = Number(req.query.cant) || 100000000

    const numRandoms = fork('./utils/generarNumRandoms')

    numRandoms.send(num)

    numRandoms.on('message', (result) => {
        return res.status(200).send(result)
    })
}


module.exports = {numRandoms}