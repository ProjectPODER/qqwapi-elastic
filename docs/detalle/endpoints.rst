Endpoints de consulta
=====================

```
URL base de la API: https://api.quienesuquien.wiki/v3/ 
```

/companies
----------

Devuelve un listado de objetos JSON tipo `Popolo
Organization <http://www.popoloproject.com/specs/organization.html>`__.

Devuelve un listado de empresas o asociaciones civiles. Si se especifica
la expansión de referencias, también se listarán las memberships y un
resúmen de los contracts de la organización.

Filtros
~~~~~~~

id
^^

El identificador único de la empresa o sociedad. Tipo de dato: string.

ids
^^^

Un conjunto de identificadores separados por coma para devolver al
inicio del conjunto de resultados. Tipo de dato: string.

identifier
^^^^^^^^^^

name
^^^^

El nombre parcial o completo de la empresa o sociedad. Realiza la
búsqueda en nombres principales y alternativos. Tipo de dato: string .

contract_count_supplier_min
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Número mínimo de contratos en los que participa la empresa como
proveedor. Tipo de dato: entero. Default: vacío. 

contract_count_supplier_max 
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Número máximo de contratos en los que
participa la empresa como proveedor. Tipo de dato: entero. Default:
vacío.

contract_amount_supplier_min
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Importe mínimo de contratos provistos por esta empresa Es importante
notar que los importes se están sumando en sus valores absolutos sin
considerar las diferencias de monedas. Tipo de dato: entero. Default:
vacío.

contract_amount_supplier_max
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Importe máximo de contratos provistos por esta empresa Es importante
notar que los importes se están sumando en sus valores absolutos sin
considerar las diferencias de monedas. Tipo de dato: entero. Default:
vacío.

subclassification
^^^^^^^^^^^^^^^^^

source
^^^^^^

country
^^^^^^^

state
^^^^^

city
^^^^

sort
^^^^

sort_direction
^^^^^^^^^^^^^^

.. _country-1:

country
^^^^^^^

El nombre del país o código ISO 3166-1 alpha-2 para el país al que
pertenece. Tipo de dato: string. 


source 
^^^^^^^

El nombre de la fuente desde la cual fue importada la información. Tipo de dato: string.

/institutions
-------------

Devuelve un listado de objetos JSON tipo `Popolo
Organization <http://www.popoloproject.com/specs/organization.html>`__.

Devuelve un listado de instituciones públicas. Si se especifica la
expansión de referencias, también se listarán las memberships y los
contracts de la organización.

.. _filtros-1:

Filtros
~~~~~~~

.. _id-1:

id
^^

El identificador único de la institución. Tipo de dato: string.

.. _ids-1:

ids
^^^

Un conjunto de identificadores separados por coma para devolver al
inicio del conjunto de resultados. Tipo de dato: string.

.. _identifier-1:

identifier
^^^^^^^^^^

.. _name-1:

name
^^^^

El nombre parcial o completo de la institución. Realiza la búsqueda en
nombres principales y alternativos. Tipo de dato: string o regular
expression.

.. _contract_count_supplier_min-1:

contract_count_supplier_min
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Número mínimo de contratos en los que participa la institución como
proveedor. Muchas aparecen en contratos como comprador (responsable de
unidad compradora) y como proveedor, por lo tanto se las puede filtrar u
ordenar por ambos criterios. Tipo de dato: entero. Default: vacío. 

contract_count_supplier_max 
^^^^^^^

Número máximo de contratos en los que
participa la institución como proveedor. Muchas aparecen en contratos
como comprador (responsable de unidad compradora) y como proveedor, por
lo tanto se las puede filtrar u ordenar por ambos criterios. Tipo de
dato: entero. Default: vacío. 

contract_count_buyer_min 
^^^^^^^

Número
mínimo de contratos en los que participa la institución como comprador.
Muchas aparecen en contratos como comprador (responsable de unidad
compradora) y como proveedor, por lo tanto se las puede filtrar u
ordenar por ambos criterios. Tipo de dato: entero. Default: vacío.

contract_count_buyer_max
^^^^^^^^^^^^^^^^^^^^^^^^

Número máximo de contratos en los que participa la institución como
comprador. Muchas aparecen en contratos como comprador (responsable de
unidad compradora) y como proveedor, por lo tanto se las puede filtrar u
ordenar por ambos criterios. Tipo de dato: entero. Default: vacío.

.. _contract_amount_supplier_min-1:

contract_amount_supplier_min
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Importe mínimo de contratos provistos por esta institución. Muchas
aparecen en contratos como comprador (responsable de unidad compradora)
y como proveedor, por lo tanto se las puede filtrar u ordenar por ambos
criterios. Es importante notar que los importes se están sumando en sus
valores absolutos sin considerar las diferencias de monedas. Tipo de
dato: entero. Default: vacío.

.. _contract_amount_supplier_max-1:

contract_amount_supplier_max
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Importe máximo de contratos provistos por esta institución. Muchas
aparecen en contratos como comprador (responsable de unidad compradora)
y como proveedor, por lo tanto se las puede filtrar u ordenar por ambos
criterios. Es importante notar que los importes se están sumando en sus
valores absolutos sin considerar las diferencias de monedas. Tipo de
dato: entero. Default: vacío. 

contract_amount_buyer_min 
^^^^^^^

Importe
mínimo de contratos comprados por esta institución. Muchas aparecen en
contratos como comprador (responsable de unidad compradora) y como
proveedor, por lo tanto se las puede filtrar u ordenar por ambos
criterios. Es importante notar que los importes se están sumando en sus
valores absolutos sin considerar las diferencias de monedas. Tipo de
dato: entero. Default: vacío. 

contract_amount_buyer_max 
^^^^^^^

Importe
máximo de contratos comprados por esta institución. Muchas aparecen en
contratos como comprador (responsable de unidad compradora) y como
proveedor, por lo tanto se las puede filtrar u ordenar por ambos
criterios. Es importante notar que los importes se están sumando en sus
valores absolutos sin considerar las diferencias de monedas. Tipo de
dato: entero. Default: vacío. 

subclassification 
^^^^^^^

classification
^^^^^^^


source 
^^^^^^^

country 
^^^^^^^

state 
^^^^^^^

city 
^^^^^^^

sort 
^^^^^^^

sort_direction
^^^^^^^


/persons
--------

Devuelve un listado de objetos JSON tipo `Popolo
Person <http://www.popoloproject.com/specs/person.html>`__.

Si se especifica la expansión de referencias, también se listarán las
memberships y los contracts de la persona.

.. _filtros-2:

Filtros
~~~~~~~

.. _id-2:

id
^^

El identificador único de la persona. Tipo de dato: string. 

name 
^^^^^^^^^^^^^^^^^^^^^^^^^^^

El
nombre parcial o completo de la persona. Realiza la búsqueda en nombres
principales y alternativos. Tipo de dato: string o regular expression.

gender
^^^^^^

El sexo asociado a la persona. Tipo de dato: string. Default: all.
Valores posibles: male, female, other. Nota: se utiliza el nombre gender
para el filtro con el propósito de evitar censura por parte de sistemas
automatizados. 

country
^^^^^^^

El nombre del país o código ISO 3166-1
alpha-2 para el país al que pertenece. Tipo de dato: string. 

source
^^^^^^^

El nombre de la fuente desde la cual fue importada la información. Tipo
de dato: string.

.. _ids-2:

ids
^^^

Un conjunto de identificadores separados por coma para devolver al
inicio del conjunto de resultados. Tipo de dato: string.

.. _identifier-2:

identifier
^^^^^^^^^^

classification
^^^^^^^^^^^^^^

.. _source-1:

source
^^^^^^

.. _country-2:

country
^^^^^^^

.. _state-1:

state
^^^^^

.. _city-1:

city
^^^^

.. _contract_count_supplier_min-2:

contract_count_supplier_min
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Número mínimo de contratos en los que participa la persona como
proveedor. Muchas aparecen en contratos como comprador (responsable de
unidad compradora) y como proveedor, por lo tanto se las puede filtrar u
ordenar por ambos criterios. Tipo de dato: entero. Default: vacío. 

contract_count_supplier_max
^^^^^^^

Número máximo de contratos en los que
participa la persona como proveedor. Muchas aparecen en contratos como
comprador (responsable de unidad compradora) y como proveedor, por lo
tanto se las puede filtrar u ordenar por ambos criterios. Tipo de dato:
entero. Default: vacío. 

contract_count_buyer_min
^^^^^^^

Número mínimo de
contratos en los que participa la persona como comprador. Muchas
aparecen en contratos como comprador (responsable de unidad compradora)
y como proveedor, por lo tanto se las puede filtrar u ordenar por ambos
criterios. Tipo de dato: entero. Default: vacío.

.. _contract_count_buyer_max-1:

contract_count_buyer_max
^^^^^^^^^^^^^^^^^^^^^^^^

Número máximo de contratos en los que participa la persona como
comprador. Muchas aparecen en contratos como comprador (responsable de
unidad compradora) y como proveedor, por lo tanto se las puede filtrar u
ordenar por ambos criterios. Tipo de dato: entero. Default: vacío.

.. _contract_amount_supplier_min-2:

contract_amount_supplier_min
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Importe mínimo de contratos provistos por esta persona. Muchas aparecen
en contratos como comprador (responsable de unidad compradora) y como
proveedor, por lo tanto se las puede filtrar u ordenar por ambos
criterios. Es importante notar que los importes se están sumando en sus
valores absolutos sin considerar las diferencias de monedas. Tipo de
dato: entero. Default: vacío.

.. _contract_amount_supplier_max-2:

contract_amount_supplier_max
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Importe máximo de contratos provistos por esta persona. Muchas aparecen
en contratos como comprador (responsable de unidad compradora) y como
proveedor, por lo tanto se las puede filtrar u ordenar por ambos
criterios. Es importante notar que los importes se están sumando en sus
valores absolutos sin considerar las diferencias de monedas. Tipo de
dato: entero. Default: vacío. 

contract_amount_buyer_min
^^^^^^^

Importe
mínimo de contratos comprados por esta persona. Muchas aparecen en
contratos como comprador (responsable de unidad compradora) y como
proveedor, por lo tanto se las puede filtrar u ordenar por ambos
criterios. Es importante notar que los importes se están sumando en sus
valores absolutos sin considerar las diferencias de monedas. Tipo de
dato: entero. Default: vacío. 

contract_amount_buyer_max
^^^^^^^

Importe
máximo de contratos comprados por esta persona. Muchas aparecen en
contratos como comprador (responsable de unidad compradora) y como
proveedor, por lo tanto se las puede filtrar u ordenar por ambos
criterios. Es importante notar que los importes se están sumando en sus
valores absolutos sin considerar las diferencias de monedas. Tipo de
dato: entero. Default: vacío.

.. _sort-1:

sort
^^^^

.. _sort_direction-1:

sort_direction
^^^^^^^^^^^^^^

/contracts
----------

Devuelve un contrato basado en OCDS pero sin compilar los releases. Para
recibir un contrato en formato OCDS por favor utilice el endpoint
/record

.. _filtros-3:

Filtros
~~~~~~~

ocid
^^^^

El identificador único del proceso de contratación (ocid). Puede
devolver múltiples contratos. Tipo de dato: string.

.. _name-2:

name
^^^^

title
^^^^^

contracts.title El título del contrato. Tipo de dato: string o regular
expression.

.. _id-3:

id
^^

.. _ids-3:

ids
^^^

.. _source-2:

source
^^^^^^

El nombre de la fuente desde la cual fue importada la información. Tipo
de dato: string.

currency (no implementado)
^^^^^^^^^^^^^^^^^^^^^^^^^^

La moneda utilizada para especificar los importes de los procesos de
contratación. Tipo de dato: string. 

format 
^^^^^^^

supplier_name 
^^^^^^^

buyer_name 
^^^^^^^

contact_point_name 
^^^^^^^

buyer_id 
^^^^^^^

funder_name 
^^^^^^^

amount_max
^^^^^^^

El importe nominal del proceso de contratación (suma de todos
las adjudicaciones de este proceso). Tipo de dato: float (sin separador
de miles y con ‘.’ como separador de decimales). Default: vacío.

amount_min
^^^^^^^^^^

El importe nominal del proceso de contratación (suma de todos las
adjudicaciones de este proceso). Tipo de dato: float (sin separador de
miles y con ‘.’ como separador de decimales). Default: vacío.

procurement_method
^^^^^^^^^^^^^^^^^^

El procedimiento bajo el cual se realizó el proceso de contratación
(adjudicación directa, licitación, etc.). Tipo de dato: string. Valores
posibles: open, selective, limited, direct. Default: vacío.

start_date_min
^^^^^^^^^^^^^^

contracts.period.startDate 

start_date_max
^^^^^^^

contracts.period.startDate 

sort 
^^^^^^^

sort_direction 
^^^^^^^

country
^^^^^^^


/record
-------

Devuelve un `OCDS
recordPackage <https://standard.open-contracting.org/latest/en/schema/record_package/>`__.
Que incluye un listado de records, cada uno con sus release (de cada
fuente) y su compiledRelease, este último es el que se utiliza para los
filtros. 

Filtros 
~~~~~~~


ocid
^^^^^^^

El identificador único del proceso de
contratación (ocid). Tipo de dato: string.

Nota: A diferencia del resto, este endpoint cointinua funcionando con la
base de datos MongoDB. Por las deficiencias en este motor de base de
datos, no se permite filtrar en este endpoint. Si quiere filtrar un
listado de contratos utliice ``/contracts`` y luego use el valor de
``ocid`` para obtener el recordPackage completo.

/areas
------

.. _name-3:

name
~~~~

.. _id-4:

id
~~

.. _ids-4:

ids
~~~

.. _classification-1:

classification
~~~~~~~~~~~~~~

.. _country-3:

country
~~~~~~~

.. _state-2:

state
~~~~~

.. _city-2:

city
~~~~

.. _sort-2:

sort
~~~~

.. _sort_direction-2:

sort_direction
~~~~~~~~~~~~~~

/summaries
----------

Devuelve los resumenes en JSON de una entidad

.. _filtros-4:

Filtros
~~~~~~~

id (obligatorio)
^^^^^^^^^^^^^^^^

El identificador único de la entidad. Tipo de dato: string. 
type
^^^^^^^

(obligatorio) El tipo de la entidad. Tipo de dato: string. Valores
posibles: “areas”, “organizations”, “persons”, “contracts”

/autocomplete/:name
-------------------

Devuelve un listado de entidades de todos los tipos coindicidendo por el
nombre

.. _name-4:

name
~~~~

.. _classification-2:

classification
~~~~~~~~~~~~~~

.. _subclassification-1:

subclassification
~~~~~~~~~~~~~~~~~

.. _sort-3:

sort
~~~~

sortDirection
~~~~~~~~~~~~~

.. _country-4:

country
~~~~~~~

.. _state-3:

state
~~~~~

.. _city-3:

city
~~~~

/search
-------

Devuelve un listado de entidades de todos los tipos permitiendo algunos
filtros

.. _filtros-5:

Filtros
~~~~~~~

.. _ids-5:

ids
^^^

Un conjunto de identificadores separados por coma para devolver al
inicio del conjunto de resultados. Tipo de dato: string. 

name
^^^^^^^


.. _classification-3:

classification
^^^^^^^^^^^^^^

.. _subclassification-2:

subclassification
^^^^^^^^^^^^^^^^^

.. _sort-4:

sort
^^^^

.. _sortdirection-1:

sortDirection
^^^^^^^^^^^^^

.. _country-5:

country
^^^^^^^

.. _state-4:

state
^^^^^

.. _city-4:

city
^^^^

/products (no implementado)
---------------------------

Devuelve productos

.. _filtros-6:

Filtros
~~~~~~~

.. _id-5:

id
^^

El identificador único de la entidad. Tipo de dato: string. 

ids
^^^^^^^

Un
conjunto de identificadores separados por coma para devolver al inicio
del conjunto de resultados. Tipo de dato: string. 

name
^^^^^^^


.. _classification-4:

classification
^^^^^^^^^^^^^^

.. _subclassification-3:

subclassification
^^^^^^^^^^^^^^^^^

.. _sort-5:

sort
^^^^

.. _sortdirection-2:

sortDirection
^^^^^^^^^^^^^

.. _country-6:

country
^^^^^^^

.. _state-5:

state
^^^^^

/spec.json
----------

Devuelve el archivo ``swagger.json``

/sources
--------

Devuelve un información sobre cantidades de entidad por fuente y por
tipo de entidad en QuienEsQuien.wiki.

Tiene dos objetos, uno de fuentes ``sources`` que tiene por cada fuente
la cantidad de elementos de cada tipo de entidad. Y otro de colecciones
``collections`` que tiene la cantidad elementos de cada tipo de entidad.

Para más información sobre las fuentes se puede consultar la sección de
`Fuentes <../fuentes/listado>`__.

/sourcesList
------------

Lista nombres e identificadores de todas las fuentes disponibles. Se usa
para construir el filtro por fuente sin hacer una consulta pesada.
