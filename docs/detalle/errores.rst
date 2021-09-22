Mensajes de error
==================================

Durante la interacción con la API pueden presentarse diversos mensajes de error.

Errores de conexión
---------------------

Si la api no está disponible, es probable que se presente un error de conexión del estilo "ConnectionError: connect ECONNREFUSED". En este caso verifique la URL de la API, y si esta es correcta, verifique la disponibilidad del servicio en la página de status de los servicios de QQW: https://status.quienesquien.wiki/


Aquí no hay nada (Error HTTP 404 )
-----------------

Las URLs de la API se componen de la base y los endpoints, ej: api.quienesquien.wiki/v3/sources), cuando se solicita una URL que no existe, se recibe este mensaje de error.


Parámetro inexistente
---------------------

Cuando se pasa via GET un parámetro inexistente, la API actúa como si el parámetro no existiera. No devuelve errores, simplemente devuelve los resultados basados en los filtros que si aplican.


Resultado vacío 
---------------------

Cuando la API no puede devolver resultados, devuelve un conjunto vacío
pero el status sigue siendo success.

Si el conjunto de filtros eliminan todos los registros, lo que ocurre es
que se devuelve un estado de éxito pero sin resultados. Es decir, el array de "data" se encuentra vacío.

Ejemplo:

::

    {

        "status": "success",
        "size": 0,
        "limit": 25,
        "offset": 0,
        "pages": 0,
        "count": 0,
        "count_precission": "eq",
        "version": {
            "version": "3.0.0-beta",
            "commit": "9dda575ed0425754b747bb7166a917403987b1aa\n",
            "commit_short": "9dda575"
        },
        "generated": "2021-07-29T17:16:56.734Z",
        "summary": {
            "amount": { },
            "sources": { },
            "year": { },
            "count": { },
            "areas": { },
            "type": { },
            "classification": { }
        },
        "data": [ ]

    }


Demasiados resultados
---------------------

La API devuelve un estado de error cuando no puede procesar la consulta.

El sistema de base de datos ElasticSearch utilizado por la API de QuienEsQuien.wiki no puede devolver resultados superiores a 10.000. Esto aplica para la suma del parámetro "offset" y parámetro "limit".

Cómo alternativa se pueden aplicar otros filtros, para que el elemento buscado quede antes del resultado número 10.000. También se puede invertir el sentido del orden usando el parámetro `sort_direction`.

Ejemplo:

::

    {

        "status": "error",
        "size": 0,
        "limit": 25,
        "offset": 10000,
        "pages": 0,
        "count": 0,
        "count_precission": "unknown",
        "version": {
            "version": "3.0.0-beta",
            "commit": "9dda575ed0425754b747bb7166a917403987b1aa\n",
            "commit_short": "9dda575"
        },
        "generated": "2021-07-29T17:28:31.534Z",
        "error": "Search size is bigger than 10000. Elasticsearch does not allow it.",
        "data": { }

    }


Error interno
-------------
Este error se presenta cuando la API tuvo problemas para consultar a la base de datos y se ve de la siguiente forma:

::
    {
        "Internal error": "search_phase_execution_exception"
    }

Si este error se presenta, por favor infórmelo junto con la dirección URL de la solicitud que lo generó.


Otros errores 
-------------



Si la API presenta un mensaje de error no explicado en esta sección, por favor cargue un issue en el repositorio para que podamos revisarlo: https://github.com/ProjectPODER/qqwapi-elastic/issues/new