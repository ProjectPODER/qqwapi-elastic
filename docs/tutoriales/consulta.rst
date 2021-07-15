Haciendo una app que consuma datos de contrataciones (desactualizado)
=====================================================================

El objetivo de esta API es que se puedan crear aplicaciones interactivas
que faciliten la investigación y presentación de datos de empresarios y
funcionarios en América Latina, en particular con el objetivo de difundir
la práctica de la rendición de cuentas corporativa.
Es por eso que incluiremos un detalle
paso a paso de cómo crear una aplicación utilizando el lenguaje de
programación JavaScript y el cliente de API
`node-qqw <https://github.com/ProjectPODER/node-qqw/>`__.

Este tutorial no es una introducción a nodejs, sino más bien una
secuencia de pasos y consideraciones para lograr tener una aplicación,
fácilmente extensible, basada en esta API.

Iniciando nuestro proyecto, elije tu GIF
----------------------------------------

Cuando iniciamos proyectos en PODER, lo hacemos eligiendo un nombre y un
GIF animado para darle identidad al proyecto, aunque esto no llegue a
publicarse, sirve para tener una forma fácil y rápida de transmitir a
todo el equipo el objetivo del mismo.

Para este tutorial realizaremos un proyecto para descargar los 100
contratos más grandes del año 2012 e identificar a las empresas más
beneficiadas ese año, lo llamaremos ``baktún``. Recordamos que este año
se publicitó como el “fin del mundo” o al menos como un gran cambio de
era, en base a algunas malas interpretaciones de la mitología maya. No
es necesario que nuestra investigación tenga sentido ya que es un
proyecto de prueba, pero tu proyecto si puede ser significativo. Si
buscas inspiración, puedes revisar nuestras páginas de
`investigaciones <https://www.quienesquien.wiki/investigaciones>`__ y
`herramientas <https://www.quienesquien.wiki/herramientas>`__.

Para realizar nuestro proyecto, vamos a utilizar el git como manejador
de versiones de código sobre el sistema operativo Ubuntu Linux, por lo
tanto creamos una nueva carpeta e iniciamos el repositorio de git de la
siguiente forma.

::

   mkdir baktun
   cd baktun
   git init

Una vez que iniciamos nuestro proyecto, debemos crear nuestro archivo
``package.json``. Este tendrá como dependencia a la librería node-qqw.

package.json:

::

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
       "qqw": "git+https://github.com/ProjectPODER/node-qqw/#v0.3.2",
     }
   }

Nota: El paquete de node-qqw aún no está publicado en el repositorio
npm, por lo que es necesario incluirlo desde github. Además incluímos el
framework express para facilitar la creación de una página web.

Luego debemos crear el archivo principal de nuestro aplicación, llamado
``app.js``. En este archivo incluiremos a la API y haremos consultas,
luego utilizaremos estas consultas para generar una página web con un
listado de nombres de las empresas más beneficiadas este año, enlazadas
a quienesquien.wiki para ver la información completa.

app.js

::

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

En este código hemos definido que utilizaremos el archivo
``routes/index.js`` para definir el contenido de nuestra aplicación, y
será ahí también donde hagamos el llamado a la API de QuienEsQuien.wiki.
También hemos definido que utilizaremos la carpeta ``views`` para poner
nuestros templates de handlebars que se utilizarán para generar el html
que enviaremos al navegador de nuestros usuarios.

Creando nuestra página principal
--------------------------------

En esta página mostraremos la historia principal de nuestro sitio, por
lo que necesitaremos consultar la API de QuienEsQuien.wiki para obtener
la información, haremos un breve repaso de la API, pero para más
información revisar la sección `Cómo consultar <https://qqwapi-elastic.readthedocs.io/es/latest/intro/como/>`__ de esta guía.

En la API se pueden realizar varios filtros, limites y órdenes de la
información. También se puede restringir la información que recibimos a
sólo los campos que necesitamos. En este caso tenemos algunos criterios:

-  Contratos que hayan sido ejecutados durante el año 2012 utilizando
   los filtros de fecha.
-  Ordenar los contratos de mayor a menor utlizando ``sort``.
-  Limitar la búsqueda a 100 elementos utilizando ``limit``.
-  (opcional) Restringir los contenidos de la respuesta utilizando
   ``fields``.

También recordemos que el sitio web de QuienEsQuien.wiki nos ofrece una forma
fácil de obtener consultas a la API desde el menú de “DATOS” en
el buscador. Es decir que cualquier búsqueda que hagamos en
QuienEsQuien.wiki se realiza a través de la API y podemos crear los
filtros de forma visual y luego copiarlos.

Haciendo consultas en QuienEsQuien.wiki
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Primero debemos realiza la consulta en QuienEsQuien.wiki para obtener
una URL de API que nos sirva de base para crear nuestra consulta. Para
esto entraremos al `buscador de
contratos <https://www.quienesquien.wiki/es/buscador?collection=contracts>`__.

Filtro de fecha
^^^^^^^^^^^^^^^

Veremos en la barra superior el filtro `FECHA`. Si no está visible, hacer click en `MÁS FILTROS`.
Configuraremos del 1 de enero de 2012 al 31 de diciembre de 2012.
Recuerda que luego de clickear en el campo, se abrirá un calendario, es
opcional utilizarlo siempre y cuando quede escrita una fecha válida en el
campo. Si utilizas el calendario, puedes clickear en el año para abrir
un desplegable que te permita navegar a otros años. No olivdes
seleccionar el día para completar la configuración de este filtro.

Finalmente presiona el botón `APLICAR`.

Cantidad de resultados
^^^^^^^^^^^^^^^^^^^^^^

Si bien la API nos permite elegir de forma arbitraria la cantida de
resultados a recibir en cada página, la interfaz de QuienEsQuien.wiki
nos ofrece un desplegable luego del listado de resultados en la página de búsqueda,
en este podemos podemos elegir 25, 50 o 100 resultados por página. Elegiremos 100.

Copiando la URL de la API
^^^^^^^^^^^^^^^^^^^^^^^^^

En la barra superior está el menú de DATOS, que despliega varias
opciones, entre ellas veremos el botón “DESCARGAR JSON”, al hacer click en este botón iremos a la página de resultado de la API.
Copiaremos la dirección de la página actual. En nuestro caso debería quedar así:

.. code:: https://api.quienesquien.wiki/v3/contracts?collection=contracts&start_date_min=2012-01-01&start_date_max=2012-12-31&limit=100&sort=contracts.value.amount&sort_direction=desc
Analicemos brevemente:

-  Primero la URL base de la API: ``https://api.quienesquien.wiki/v4/``
-  A continuación el tipo de entidad: ``contracts``
-  A continuación tenemos los filtros de fecha, estos filtran contratos
   cuya ejecución haya comenzado después de la fecha de incio y haya
   terminado antes de la fecha de finalización. Las fechas se expresan
   como año-mes-día.
-  Luego el criterio de ordenamiento:
   ``sort=contracts.value.amount``. Este campo es el importe total de cada proceso de contrato.
-  Luego tenemos el campo ``limit`` en 100, que especifica la
   cantidad de contratos que queremos.
- Finalmente tenemos el campo sort_direction que nos especifica "desc" para que sea de mayor a menor.

¿Qué devuelve la API?

Un listado de contratos en el objeto ``data``, además de un resúmen de los datos y otros metadatos de la consulta, como la versión de la API. Por suerte no tendremos
que hacer un sistema que analice la respuesta de la API en crudo, sino
que utilizaremos un cliente de API.

El cliente de API node-qqw
--------------------------

node-qqw es un paquete de npm disponible en
`github <https://github.com/ProjectPODER/node-qqw/>`__ para incluir en
tus proyectos.

Para realizar un llamado a la API desde nuestro proyecto ``baktún`` lo
que debemos hacer es incluir el módulo primero.

::

   function getApi() {
     let Qqw = require('qqw');
     var client = new Qqw({rest_base: process.env.API_BASE});

Luego hay que construir el objeto de filtros que el enviaremos:

::

     const params = {
        collection: "contracts",
        start_date_min: "2012-01-01",
        start_date_max: "2012-12-31",
        limit: "100",
        sort: "contracts.value.amount",
        sort_direction: "desc"
     }

Luego hacemos la consulta. Hay varias formas de hacer la consulta, pero
en este caso estamos utilizando promesas con ``await``, aunque también
podríamos usar ``then``.

::

     result = await client.get_promise(collection, params);
     return result;
   }

Finalmente debemos crear la ruta y pasarle la información a nuestro
template:

::

   function homePage(res,req) {
     result = getApi();
     res.render("index", {result: result});

   }

   router.get('/', homePage());

Y listo, ya tenemos un sitio funciona, sólo nos queda configurar nuestro
template y probarlo.

En ``views/index.hbs``:

::

   <h1>Baktún</h1>
   <h2>Listado de los 100 contratos más caros de 2012.</h2>
   {{#if result.data.length }}
     {{#each result.data.}}
       {{#each this.awards}}
       Contrato: Proveedor(es): {{this.parties.suppliers.names}} Título: {{this.contracts.title}} Importe: {{this.contracts.value.amount}} {{this.contracts.value.currency}}
       {{/each}}
     {{/each}}
   {{/if}}

Para probarlo debemos ejecutar ``npm run start``.

Calcular el proveedor más beneficiado
-------------------------------------

Ya tenemos toda la información de los contratos, pero nuestro objetivo
era sumar el total de importes de cada proveedor y mostrarlos en un
ranking. Para esto hay que procesar los contratos luego de que lleguen
de la API y antes de pasarlos al template.

Hay que crear una función que suma importes, los agrupa por proveedor y
lo envía al template como otra variable.

Si llegaste hasta aquí y tienes ganas de ayudarnos a completar este tutorial, por favor escríbenos a info@quienesquien.wiki
