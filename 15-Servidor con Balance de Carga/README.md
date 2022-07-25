# Servidor con balance de carga

1. Correr "npm i" (Instalacion de todos los paquetes del proyecto)

2. Generar el .env (tomar de ejemplo el .env.sample)

3. Para levantar el sevidor correr el siguiente comando "node index.js --port=8080 --modo=" (Libreria yargs)

4. Se agrego el parametro "modo" para especificar si levantar el servidor en modo FORK o CLUSTER (sino se ingresa el paramentro levanta en modo FORK):

    node index.js --port=8080 --modo=FORK
    node index.js --port=8080 --modo=CLUSTER

5. Url para acceder a la ruta de Informacion: http://localhost:8080/info (se agrego el campo "Cantidad de Procesadores")

6. Modo FORK con PM2: 

pm2 start index.js --watch -- 8080

7. Modo CLUSTER con PM2:

pm2 start index.js --watch -- -i max -- 8080

# Resolucion de Ejercicio:

pm2  start index.js --name="Puerto 8082" --watch -i 3  -- -- 8082
pm2  start index.js --name="Puerto 8083" --watch -i 3  -- -- 8083
pm2  start index.js --name="Puerto 8084" --watch -i 3  -- -- 8084
pm2  start index.js --name="Puerto 8085" --watch -i 3  -- -- 8085

## Monitorea con el codigo "pm2 monit"

# Setear el archivo nginx.conf

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    upstream node_app {
        server localhost:8082;
        server localhost:8083;
        server localhost:8084;
        server localhost:8085;
    }

    server {
        listen       8080;
        server_name  localhost;
        location /api/randoms {
            proxy_pass http://node_app
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}