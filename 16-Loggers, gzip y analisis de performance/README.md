# Servidor con balance de carga

1. Correr "npm i" (Instalacion de todos los paquetes del proyecto)

2. Generar el .env (tomar de ejemplo el .env.sample)

3. Para levantar el sevidor correr el siguiente comando "node index.js --port=8080 --modo=" (Libreria yargs)

# Informe:

1. Ruta /info sin compresion: 2.9k

Ruta /info con compresion: 1.1kb

Para determinar el nivel de compresion, modificar el parametro level dentro de la funcion compression(). Se encuentra seteada en 9 que es el maximo.

2. Se agrego la libreria Winston para tomar los logs de los distintos metodos y rutas. Tanto en archivos como en consola.

3. Se utilizo el tes de carga Artillery para comprobar la misma con el siguiente comando:

artillery quick --count 50 -n 20 http://localhost:8080/info > result_fork.txt