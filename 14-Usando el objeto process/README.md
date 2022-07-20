# Usando el objeto process

1. Correr "npm i" (Instalacion de todos los paquetes del proyecto)

2. Generar el .env (tomar de ejemplo el .env.sample)

3. Para levantar el sevidor correr el siguiente comando "node index.js --port=8080" (Libreria yargs)

4. Url para acceder a la ruta de Informacion: http://localhost:8080/info

5. Url para acceder a Numeros Randoms: http://localhost:8080/api/randoms?cant=200 con envio de cantidad, sin ella genera lo prestablecido que son 100.000.000