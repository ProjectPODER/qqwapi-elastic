## Haciendo una app que consuma datos de contrataciones (desactualizado)
El objetivo de esta API es que se puedan crear aplicaciones interactivas que faciliten la investigación y presentación de datos de empresarios y funcionarios en América Latina, es por eso que incluiremos un detalle paso a paso de cómo crear una aplicación utilizando el lenguaje de programación JavaScript y el cliente de API [node-qqw](https://github.com/ProjectPODER/node-qqw/).

Este tutorial no es una introducción a nodejs, sino más bien una secuencia de pasos y consideraciones para lograr tener una aplicación, fácilmente extensible, basada en esta API.

### Iniciando nuestro proyecto, elije tu GIF

Cuando iniciamos proyectos en PODER, lo hacemos eligiendo un nombre y un GIF animado para darle identidad al proyecto, aunque esto no llegue a publicarse, sirve para tener una forma fácil y rápida de transmitir a todo el equipo el objetivo del mismo.

Para este tutorial realizaremos un proyecto para descargar los 100 contratos más grandes del año 2012 e identificar a las empresas más beneficiadas ese año, lo llamaremos `baktún`. Recordamos que este año se publicitó como el "fin del mundo" o al menos como un gran cambio de era, en base a algunas malas interpretaciones de la mitología maya. No es necesario que nuestra investigación tenga sentido ya que es un proyecto de prueba, pero tu proyecto si puede ser significativo. Si buscas inspiración, puedes revisar nuestras páginas de [investigaciones](https://www.quienesquien.wiki/investigaciones) y [herramientas](https://www.quienesquien.wiki/herramientas).

Para realizar nuestro proyecto, vamos a utilizar el git como manejador de versiones de código sobre el sistema operativo Ubuntu Linux, por lo tanto creamos una nueva carpeta e iniciamos el repositorio de git de la siguiente forma.

```
mkdir baktun
cd baktun
git init
```

Una vez que iniciamos nuestro proyecto, debemos crear nuestro archivo `package.json`. Este tendrá como dependencia a la librería node-qqw.

package.json:
```
{
  "name": "baktun-test",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "~4.16.1",
    "express-handlebars": "^3.0.2",
    "qqw": "git+https://github.com/ProjectPODER/node-qqw/#v0.2.1",
  }
}

```

Nota: El paquete de node-qqw aún no está publicado en el repositorio npm, por lo que es necesario incluirlo desde github. Además incluímos el framework express para facilitar la creación de una página web.

Luego debemos crear el archivo principal de nuestro aplicación, llamado `app.js`. En este archivo incluiremos a la API y haremos consultas, luego utilizaremos estas consultas para generar una página web con un listado de nombres de las empresas más beneficiadas este año, enlazadas a quienesquien.wiki para ver la información completa.

app.js
```
var express = require('express');
var hbs = require('express-handlebars');

var indexRouter = require('./routes/index');


app.engine('.hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, 'views')
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', indexRouter);

module.exports = app;


```

En este código hemos definido que utilizaremos el archivo `routes/index.js` para definir el contenido de nuestra aplicación, y será ahí también donde hagamos el llamado a la API de QuienEsQuien.wiki. También hemos definido que utilizaremos la carpeta `views` para poner nuestros templates de handlebars que se utilizarán para generar el html que enviaremos al navegador de nuestros usuarios.

### Creando nuestra página principal

En esta página mostraremos la historia principal de nuestro sitio, por lo que necesitaremos consultar la API de QuienEsQuien.wiki para obtener la información, haremos un breve repaso de la API, pero para más información revisar la sección [Cómo consultar](link?) de esta guía.

En la API se pueden realizar varios filtros, limites y órdenes de la información. También se puede restringir la información que recibimos a sólo los campos que necesitamos. En este caso tenemos algunos criterios:

* Contratos que hayan sido ejecutados durante el año 2012 utilizando los filtros de fecha.
* Ordenar los contratos de mayor a menor utlizando `sort`.
* Limitar la búsqueda a 100 elementos utilizando `limit`.
* (opcional) Restringir los contenidos de la respuesta utilizando `fields`.

También recordemos que el sitio QuienEsQuien.wiki nos ofrece una forma fácil de obtener consultas a la API desde el menú de "herramientas" en la página de búsqueda. Es decir que cualquier búsqueda que hagamos en QuienEsQuien.wiki se realiza a través de la API y podemos crear los filtros de forma visual y luego copiarlos.

#### Haciendo consultas en QuienEsQuien.wiki

Primero debemos realiza la consulta en QuienEsQuien.wiki para obtener una URL de API que nos sirva de base para crear nuestra consulta. Para esto entraremos al [buscador de contratos](https://www.quienesquien.wiki/contratos).

##### Filtro de fecha
Veremos en la barra lateral los filtros por fecha. Configuraremos el primero al 1 de enero de 2012 y el segundo al 31 de diciembre de 2012. Recuerda que luego de clickear en el campo, se abrirá un calendario, es opcinal utilizarlo siempre y cuando quede escrita una fecha válida en el campo. Si utilizas el calendario, puedes clickear en el año para abrir un desplegable que te permita navegar a otros años. No olivdes seleccionar el día para completar la configuración de este filtro.

Finalmente presiona el botón "filtrar" al final de la barra lateral.

##### Cantidad de resultados

Si bien la API nos permite elegir de forma arbitraria la cantida de resultados a recibir en cada página, la interfaz de QuienEsQuien.wiki nos ofrece un desplegable en la barra superior de la página de búsqueda donde podemos elegir 25, 50 o 100 resultados por página. Elegiremos 100.

##### Copiando la URL de la API
En la barra superior está el menú de herramientas, que despliega varias opciones, entre ellas veremos el botón "Copiar URL", este pondrá el el portapapeles de nuestra computadora, la URL de la API que se consultó para llegar a este resultado. En nuestro caso debería quedar así:

``` https://api.quienesquien.wiki/v2/contracts?sort=-compiledRelease.total_amount&compiledRelease.contracts.period.startDate=%3E2012-01-01T00%3A00%3A00.000&compiledRelease.contracts.period.endDate=%3C2012-12-31T00%3A00%3A00.000&limit=100
```

Analicemos brevemente:

* Primero la URL base de la API: `https://api.quienesquien.wiki/v2/`
* A continuación el tipo de entidad: `contracts`
* Luego el criterio de ordenamiento: `sort=-compiledRelease.total_amount`. Este está compuesto por un signo menos, lo que indica la dirección de ordenamiento, en este caso de mayor a menor, y luego el nombre del campo. Este campo es el importe total de cada proceso de contratación `compiledRelease.total_amount`.
* A continuación tenemos los filtros de fecha, estos filtran contratos cuya ejecución haya comenzado después de la fecha de incio y haya terminado antes de la fecha de finalización. Las fechas se expresan en standard ISO.
* Finalmente tenemos el campo `limit` en 100, que especifica la cantidad de contratos que queremos.

¿Qué devuelve la API?

Un listado de contratos en el objeto `data`. Por suerte no tendremos que hacer un sistema que analice la respuesta de la API en crudo, sino que utilizaremos un cliente de API.


### El cliente de API node-qqw

node-qqw es un paquete de npm disponible en [github](https://github.com/ProjectPODER/node-qqw/) para incluir en tus proyectos.

Para realizar un llamado a la API desde nuestro proyecto `baktún` lo que debemos hacer es incluir el módulo primero.

```
function getApi() {
  let Qqw = require('qqw');
  var client = new Qqw({rest_base: process.env.API_BASE});
```

Luego hay que construir el objeto de filtros que el enviaremos:
```
  const params = {
    sort: "-compiledRelease.total_amount",
    "compiledRelease.contracts.period.startDate" ">2012-01-01T00%3A00%3A00.000",
    "compiledRelease.contracts.period.endDate": "<2012-12-31T00%3A00%3A00.000",
    "limit": 100
  }
```
Luego hacemos la consulta. Hay varias formas de hacer la consulta, pero en este caso estamos utilizando promesas con `await`, aunque también podríamos usar `then`.

```
  result = await client.get_promise(collection, params);
  return result;
}
```

Finalmente debemos crear la ruta y pasarle la información a nuestro template:

```
function homePage(res,req) {
  result = getApi();
  res.render("index", {result: result});

}

router.get('/', homePage());
```

Y listo, ya tenemos un sitio funciona, sólo nos queda configurar nuestro template y probarlo.

En `views/index.hbs`:
```
<h1>Baktún</h1>
<h2>Listado de los 100 contratos más caros de 2012.</h2>
{{#if result.data.0.records.length }}
  {{#each result.data.0.records}}
    {{#each this.awards}}
    Contrato: Proveedor(es): {{this.suppliers}} Título: {{this.title}} Importe: {{this.value.amount}} {{this.value.currency}}
    {{/each}}
  {{/each}}
{{/if}}
```

Para probarlo debemos ejecutar `npm run start`.

### Calcular el proveedor más beneficiado

Ya tenemos toda la información de los contratos, pero nuestro objetivo era sumar el total de importes de cada proveedor y mostrarlos en un ranking. Para esto hay que procesar los contratos luego de que lleguen de la API y antes de pasarlos al template.

Hay que crear una función que suma importes, los agrupa por proveedor y lo envía al template como otra variable.

Este tutorial está incompleto, si desea utilizar la api puede consultarnos a info@quienesquien.wiki
