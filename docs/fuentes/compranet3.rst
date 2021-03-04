Compranet 3.0
-------------

CompraNet es el sistema electrónico de información pública gubernamental
sobre adquisiciones, arrendamientos y servicios, así como obras públicas
y servicios relacionados con las mismas. Hasta 2011, el sistema se
llamaba Compranet 3.0 y los datos de contratos publicados en este
sistema tienen una estructura distinta a los que se publicaron
posteriormente en la versión siguiente de Compranet.

Origen de los datos:
https://sites.google.com/site/cnetuc/contratos_cnet_3

Mapeo de campos
~~~~~~~~~~~~~~~

+------------------------------------+----------------------------------------+-----------------------------------------------------------+
| COLUMNA                            | TIPO/VALORES                           | OCDS                                                      |
+====================================+========================================+===========================================================+
| DEPENDENCIA / ENTIDAD              | **string**                             | | *Para parties.role = "buyer":*                          |
|                                    |                                        | | parties.memberOf.nameparties.memberOf.id                |
+------------------------------------+----------------------------------------+-----------------------------------------------------------+
| NOMBRE UC                          | **string**                             | | tender.procuringEntity.id                               |
|                                    |                                        | | tender.procuringEntity.name                             |
|                                    |                                        | | buyer.id                                                |
|                                    |                                        | | buyer.name                                              |
|                                    |                                        | | *Para parties.role = "buyer":*                          |
|                                    |                                        | | parties.id                                              |
|                                    |                                        | | parties.name                                            |
|                                    |                                        | | parties.identifier.legalName                            |
+------------------------------------+----------------------------------------+-----------------------------------------------------------+
| CLAVE UC                           | **string**                             | | *Para parties.role = "buyer":*                          |
|                                    |                                        | | parties.identifier.id                                   |
+------------------------------------+----------------------------------------+-----------------------------------------------------------+
| NUMERO DE PROCEDIMIENTO            | **string**                             | | id                                                      |
|                                    |                                        | | ocid                                                    |
|                                    |                                        | | tender.id                                               |
+------------------------------------+----------------------------------------+-----------------------------------------------------------+
| TIPO DE PROCEDIMIENTO              | | **string**                           | | tender.procurementMethod *(mapeado a codelist)*         |
|                                    | | "Adjudicación Directa"               | | tender.procurementMethodDetails                         |
|                                    | | "Invitación a 3"                     |                                                           |
|                                    | | "Licitación Pública"                 |                                                           |
+------------------------------------+----------------------------------------+-----------------------------------------------------------+
| TIPO CONTRATACION                  | | **string**                           | | tender.mainProcurementCategory *(mapeado a codelist)*   |
|                                    | | "Servicios"                          | | tender.additionalProcurementCategories                  |
|                                    | | "Adquisiciones"                      |                                                           |
|                                    | | "Arrendamientos"                     |                                                           |
|                                    | | "Obra Pública"                       |                                                           |
|                                    | | "Servicios Relacionados con la OP"   |                                                           |
+------------------------------------+----------------------------------------+-----------------------------------------------------------+
| CARACTER                           | | **string**                           | tender.procurementMethodCharacterMxCnet                   |
|                                    | | "Nacional"                           |                                                           |
|                                    | | "Internacional"                      |                                                           |
+------------------------------------+----------------------------------------+-----------------------------------------------------------+
| NUMERO DE CONTRATO                 | **string**                             | | awards.id                                               |
|                                    |                                        | | contracts.id                                            |
|                                    |                                        | | contracts.awardID                                       |
+------------------------------------+----------------------------------------+-----------------------------------------------------------+
| REFERENCIA DE LA CONTRATACION      | **string**                             | | tender.title                                            |
|                                    |                                        | | awards.title                                            |
|                                    |                                        | | contracts.title                                         |
+------------------------------------+----------------------------------------+-----------------------------------------------------------+
| FECHA DE SUSCRIPCION DE CONTRATO   | **date**                               | | contracts.date                                          |
|                                    |                                        | | contracts.period.startDate                              |
+------------------------------------+----------------------------------------+-----------------------------------------------------------+
| IMPORTE MN SIN IVA                 | **number**                             | | awards.value.amount                                     |
|                                    |                                        | | contracts.value.amount                                  |
+------------------------------------+----------------------------------------+-----------------------------------------------------------+
| RAZON SOCIAL                       | **string**                             | | awards.suppliers.id                                     |
|                                    |                                        | | awards.suppliers.name                                   |
|                                    |                                        | | *Para parties.role = "supplier":*                       |
|                                    |                                        | | parties.id                                              |
|                                    |                                        | | parties.name                                            |
+------------------------------------+----------------------------------------+-----------------------------------------------------------+
| URL DEL CONTRATO                   | **string**                             | awards.documents.url                                      |
+------------------------------------+----------------------------------------+-----------------------------------------------------------+

Mapeos a codelists OCDS
~~~~~~~~~~~~~~~~~~~~~~~

Tipos de Contratación (tender.mainProcurementCategory)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

+------------------------------------+--------------+
| VALOR ORIGINAL                     | VALOR OCDS   |
+====================================+==============+
| Adquisiciones                      | goods        |
+------------------------------------+--------------+
| Arrendamientos                     | goods        |
+------------------------------------+--------------+
| Obra Pública                       | works        |
+------------------------------------+--------------+
| Servicios Relacionados con la OP   | works        |
+------------------------------------+--------------+
| Servicios                          | services     |
+------------------------------------+--------------+

Tipos de Procedimiento (tender.procurementMethod)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

+------------------------+--------------+
| VALOR ORIGINAL         | VALOR OCDS   |
+========================+==============+
| Licitación Pública     | open         |
+------------------------+--------------+
| Invitacion a 3         | limited      |
+------------------------+--------------+
| Adjudicacion Directa   | direct       |
+------------------------+--------------+
