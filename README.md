# Prueba-Tecnica-Clonify

## Como correr la pagina?

````
Paso 1
    Crear archivo .env parado en la carpeta Backend

Paso 2
    Crear las siguientes variables de entorno dentro de ese archivo

    - PORT=8000
    - POSTGRES_USERNAME=postgres (O nombre de usuario de postgres)
    - POSTGRES_HOST=localhost
    - POSTGRES_PORT=5432         (O puerto usado para postgres)
    - POSTGRES_DBNAME=clonify    (Crearla en psql previemente)
    - POSTGRES_PASSWORD=         (Contraseña de Postgres)

Paso 3
    Instalar las dependencias

    Hacer npm install parado sobre la carpeta Backend y lo mismo pero en la carpeta Frontend

````

### Usuarios precargados

````
Usuario 1
    D.N.I.: 12 345 678
    Nombre: Sergio Ortiz
    Cantidad de post precargados: 2

Usuario 2
    D.N.I.: 87 654 321
    Nombre: Martin Ries
    Cantidad de post precargados: 2

Usuario 3
    D.N.I: 42 301 106
    Nombre: Lucas Fernandez
    Cantidad de post precargados: 0
````

### Mejoras que agegaria

````
1) Autenticacion con alguna libreria como JWT o Firebase

2) Inicio de sesion con usuario y contraseña(hasheada)

3) Que los usuarios tengan perfiles

4) Funcionalidad para que el usuario busque mediante una seacrhbar un usuario y pueda ver su perfil y sus posteos

5) Poder comentar, reaccionar y compartir los posteos de los usuarios

6) Una interaz para los usuarios que son admin


````