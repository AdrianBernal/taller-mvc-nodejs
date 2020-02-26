# taller-mvc-nodejs

# node.js
Node.js® es un entorno de ejecución para JavaScript construido con el motor de JavaScript V8 de Chrome.

Concebido como un entorno de ejecución de JavaScript orientado a eventos asíncronos, Node.js está diseñado para construir aplicaciones en red escalables.

https://nodejs.org/es/

## nvm (Node.js Version Manager)
Hay situaciones en las que la posibilidad de cambiar entre diferentes versiones de Node.js puede ser muy útil. Por ejemplo, si quieres probar un módulo que estás desarrollando con la última versión de Node sin desinstalar la versión estable de Node, esta utilidad puede ayudarte.

### Instalar
Instalar nvm en **Linux** usando los comandos cURL o Wget:
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
```
```sh
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
```
Instalar nvm en **Windows**  descargando el installable desde [aquí](https://github.com/coreybutler/nvm-windows/releases/download/1.1.7/nvm-setup.zip "nvm-windows").

#### Instalar node.js con nvm
Instala la última version de node.js con el comando `nvm install node`

## Event Loop
 En un servidor web sobre node.js se pueden manejar muchas conexiones concurrentes.
 Por cada conexión el callback se ejecutará el callback asignado cuando se pone el servidor a la escucha.

```javascript
var http = require('http');
var http_IP = '127.0.0.1';
var http_port = 8899;
var router = require('./router');

var server =
    http.createServer(
        (req, res) => {
            if (req.method === 'GET') {
                require('./router').get(req, res);
            } else if (req.method === 'POST') {
                require('./router').post(req, res);
            }
       }
    );

server.listen(http_port, http_IP);

console.log('listening to http://' + http_IP + ':' + http_port);
```

* Node.js utiliza un modelo de E/S asíncrono no bloqueante impulsado por eventos.

    La programación basada en eventos es un paradigma de programación en el que el flujo 
del programa realiza acciones en respuesta a los eventos. 
Cuando ocurre un evento, se ejecuta una función callback.

* Node.js trabaja con un bucle de eventos de un solo hilo.

    Las operaciones de E/S suelen necesitar de esperas. Cuando se utiliza un servidor multi-hilo
y se realizan muchas peticiones que necesitan realizar operaciones de E/S pueden quedarse en
ejecución muchos hilos consumiendo memoria RAM.

    El bucle de eventos es lo que permite a Node.js realizar operaciones de E/S sin bloqueo a pesar
utilizar un solo hilo. El bucle, que se ejecuta en el mismo hilo que el código JavaScript,
toma una tarea del código y la ejecuta. Si la tarea es asíncrona o una
operación de E/S, el bucle la descarga en el núcleo del sistema, como 
en el caso de nuevas conexiones al servidor, o en un conjunto (pool) de hilos, 
como las operaciones relacionadas con el sistema de archivos. El bucle
entonces toma la siguiente tarea y la ejecuta.

Mas información [aquí](https://www.freecodecamp.org/news/node-js-what-when-where-why-how-ab8424886e2/).

## Módulos

Node usa dos módulos principales para gestionar las dependencias de módulos:
* El modulo `require`.
* El modulo `module`.

Ambos disponibles en el ámbito (scope) global. No es necesario hacer `require('module')` ni `import 'require'` o `require('require')`.

Los módulos de Node tienen una relación uno a uno con un fichero.
Cuando requerimos un módulo cargamos el contenido de un archivo en memoria.

Si guardamos el módulo en la carpeta `node_modules` lo cargará aunque no indiquemos la ruta.

También podemos crear una carpeta con el nombre del módulo en
en `node_modules` y colocar un archivo index.js. Cargará el archivo index.js de esa carpeta.
También podemos incluir un archivo `package.json` para cambiar el archivo que se cargará.
Un ejemplo de contenido del fichero es `{ "name": "find-me-folder", "main": "start.js" }`.

### Exportar
La variable `exports` dentro de cada módulo es sólo una referencia a `module.exports` que gestiona las propiedades exportadas.
Por ello no podemos exportar una función con `exports = function() {}` ya que cambiaremos la referencia
en vez de cambiar el objeto `module.exports`.

El objeto `module.exports` en cada módulo es lo que la función require devuelve cuando requerimos ese módulo.

El proceso de cargar un modelo es síncrono. Esto también significa que no podemos cambiar el objeto exportado asincrónicamente.
 Por ejemplo, modificando el objeto `module.exports` en un callback de una llamada asíncrona.
 
 Podemos requerir de forma nativa archivos JSON y archivos adicionales C++ con la función de requerir. Ni siquiera es necesario especificar la extensión del archivo para hacerlo.
 
 Antes de compilar un módulo, Node envuelve el código del módulo en una función, que podemos inspeccionar usando la propiedad de envoltura del módulo.
 
 ```javascript
~ $ node
> require('module').wrapper
[ '(function (exports, require, module, __filename, __dirname) { ',
  '\n});' ]
>
```

Esto es lo que hace que los parámetros parezcan globales cuando en realidad son específicos de cada módulo.

Mas información [aquí](https://www.freecodecamp.org/news/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8/).
Mas información [aquí](https://nodejs.org/api/esm.html).

## function
The difference is that functionOne is a function expression and so only defined when that line is reached, 
whereas functionTwo is a function declaration and is defined as soon as its surrounding function or script is executed
(due to [hoisting](http://adripofjavascript.com/blog/drips/variable-and-function-hoisting.html)).

```javascript
// TypeError: functionOne is not a function
functionOne();

var functionOne = function() {
  console.log("Hello!");
};
```

```javascript
// Outputs: "Hello!"
functionTwo();

function functionTwo() {
  console.log("Hello!");
}
```

## MVC

1. Server – to listen to and respond to HTTP requests

    Server.js  Package.json

2. Router – to send the incoming requests to the correct controller

    Router.js

3. Controllers – to perform operations & interrogate the data
    
    userController.js  404.js

4. Model – to provide the data

    User.js

5. Views – to provide the HTML rendering we’re going to see in the browser

    Template.js    404.myt   user.myt
    
    
`node server.js`

`npm start` con package.json. Más información [aquí](https://docs.npmjs.com/files/package.json).
