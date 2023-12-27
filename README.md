# Alrededor de los Estados Unidos

### Descripción general

"Alrededor de los Estados Unidos" inicio como un proyecto en el cual se mostraban fotografías de sitios turísticos dentro de los estados unidos, sin embargo, ha sido construido de manera que estás fotografías puedan ser modificadas.

Como ejemplo podrás encontrar imagenes de lugares turísticos de Europa, sin embargo, puedes agregar nuevas imágenes. Las imágenes solo podrán ser eliminadas por el usuario que las creó, sin embargo, actualmente la aplicación trabaja con un único usuario.

### Tecnologías

Podrás encontrar que en el proyecto se utilizaron las siguientes tecnologías:

- HTML
- CSS
- JavaScript
- NodeJS
- Webpack

Asimismo, se soportar la minificación de las hojas de estilo y transpilación de los scripts para navegadores más antiguos (ver `babel.config.js`).

- Se han utilizado las capacidades asincronas de JavaScript mediante el uso de `promises`, para el consumo del api `https://around.nomoreparties.co/v1/web_es_10`, la cual permite interactuar con la información del usuario y con las imágenes de los sitios turísticos.

### Organización

- Para la organización de los archivos CSS se utilizó la metodología BEM.

- Adicionalmente, los scripts han sido desarrollados utilizando la programación orientada a objetos (POO), mediante el uso de clases, herencia y polimorfismo. Asimismo, los scripts se encuentran modularizados para su reutilización.

### ¿Cómo levantar el proyecto?

Para iniciar el proyecto:

1. Instalar dependencias `npm install`;
2. Ejecutar `npm run dev` para ejecutar de manera local, o `npm run build` para compilar la versión productiva.
3. Se iniciará la aplicación en automático en el puerto `9000`.

### Aplicación en vivo

- Puedes visitar la aplicación en vivo en https://josecespinoza.github.io/web_project_4_esp/
