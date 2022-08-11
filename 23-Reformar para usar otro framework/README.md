# 23-Reformar para Usar otro Framework - Sails

1. Para iniciar el proyecto correr "npm install" para instalar todos los paquetes.

2. Luego correr "sails lift" en modo "alter"

## Rutas para Crud:

1. getAll => http://localhost:1337/films

2. getById => http://localhost:1337/films/62f5594ccfb915587cbdeae6

3. create => http://localhost:1337/films/create?titulo=Gladiador&año=1992&duracion=155 minutos

4. update => http://localhost:1337/films/update/62f57d05a146126894f78dfb?año=1993 (o cualquier otro dato que quiera modificar)

5. delete => http://localhost:1337/films/destroy/62f57920a146126894f78df4