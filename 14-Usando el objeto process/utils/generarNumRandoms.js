process.on("message", (num) =>{
    const numerosRandom = getNumRandoms(num)

    process.send(numerosRandom)
})

function getNumRandoms(cantNumeros){

    const cantIteracion = 1000

    let valueAppearances = [];

    for (let index = 0; index <= cantNumeros; index++) {
        valueAppearances.push(0);
    }

    for (let i = 1; i <= cantIteracion; i++) {
        const numRandom = Math.floor(Math.random() * cantNumeros) + 1 
        valueAppearances[numRandom] = valueAppearances[numRandom] + 1;
    }

    numerosFormatObjeto = valueAppearances.reduce(function (target, key, index) {
        
        target[index] = key;

        return target;

    }, {});

    delete numerosFormatObjeto["0"];

    return numerosFormatObjeto;
}