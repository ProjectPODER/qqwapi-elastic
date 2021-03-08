Mensajes de error (desactualizado)
==================================

Cuando la API no puede devolver resultados, devuelve un conjunto vacío
pero el status sigue siendo success.

La API devuelve un mensaje de error cuando no pudo procesar la consulta.

Hay un límite máximo de 5 segundos a las consultas a la base de datos.
Las consultas realizadas sobre campos sin índice normalmente exceden
este límite y generan mensajes de error.

Parámetro inexistente
---------------------

.. code:: json

   {

       "message": "Validation errors",
       "errors": [
           {
               "code": "INVALID_REQUEST_PARAMETER",
               "errors": [
                   {
                       "code": "PATTERN",
                       "params": [
                           "^[23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz]{17}$",
                           "a=a"
                       ],
                       "message": "String does not match pattern ^[23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz]{17}$: a=a",
                       "path": [ ],
                       "description": "Internal ID of person"
                   }
               ],
               "in": "path",
               "message": "Invalid parameter (_id): Value failed JSON Schema validation",
               "name": "_id",
               "path": [
                   "paths",
                   "/persons/{_id}",
                   "get",
                   "parameters",
                   "0"
               ]
           }
       ]

   }

Resultado vacío (desactualizado)
===============

Si el conjunto de filtros eliminan todos los registros, lo que ocurre es
que se devuelve un estado de éxito pero sin resultados.

Ejemplo:

::

   {

       "status": "success",
       "size": 0,
       "limit": 1,
       "offset": 0,
       "pages": 0,
       "count": 0,
       "data": [ ]

   }

Exceso de tiempo de procesamiento (desactualizado)
=================================

Las consultas de API no deben tardar más de 6 segundos en ejecutarse en
la base de datos, es por esto que si se realizan consultas sobre campos
indexistentes o que no tienen índice o que por sus relaciones con otras
tablas o por otras razones toman más de 6 segundos, estas consultas
devuelven un mensaje de error.

Ejemplo:

::

   {

       "status": "error",
       "size": 0,
       "limit": 1,
       "offset": 0,
       "pages": null,
       "count": "error: MongoError: Exec error resulting in state DEAD :: caused by :: errmsg: \"operation exceeded time limit\"",
       "data": "error: MongoError: Executor error during find command :: caused by :: errmsg: \"operation exceeded time limit\""

   }
