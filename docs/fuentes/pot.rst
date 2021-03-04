POT (Portal de Obligaciones de Transparencia)
---------------------------------------------

El Portal de Obligaciones de Transparencia (POT), es el sistema que
mantiene el cumplimiento histórico a las obligaciones de transparencia
que se consideraron en la abrogada Ley Federal de Transparencia y Acceso
a la Información Pública Gubernamental (LFTAIPG).

Origen de los datos:
http://portaltransparencia.gob.mx/pot/fichaOpenData.do?method=fichaOpenData&fraccion=contrato

Mapeo de campos
~~~~~~~~~~~~~~~

+----------------------------------------------------+----------------------------------------+-----------------------------------------------------+
| COLUMNA                                            | TIPO/VALORES                           | OCDS                                                |
+====================================================+========================================+=====================================================+
| Institución                                        | **string**                             | | *Para parties.role = "buyer"*:                    |
|                                                    |                                        | | parties.memberOf.name                             |
|                                                    |                                        | | parties.memberOf.id                               |
+----------------------------------------------------+----------------------------------------+-----------------------------------------------------+
| Número de Contrato                                 | **string**                             | | ocid                                              |
|                                                    |                                        | | id                                                |
|                                                    |                                        | | tender.id                                         |
|                                                    |                                        | | awards.id                                         |
|                                                    |                                        | | contracts.id                                      |
|                                                    |                                        | | contracts.awardID                                 |
+----------------------------------------------------+----------------------------------------+-----------------------------------------------------+
| Procedimiento de contratación                      | | **string**                           | | tender.procurementMethod *(mapeado a codelist)*   |
|                                                    | | "ADJUDICACION DIRECTA"               | | tender.procurementMethodDetails                   |
|                                                    | | "INVITACIÓN A TRES PERSONAS"         |                                                     |
|                                                    | | "LICITACIÓN PÚBLICA INTERNACIONAL"   |                                                     |
|                                                    | | "LICITACIÓN PÚBLICA NACIONAL"        |                                                     |
|                                                    | | "OTROS"                              |                                                     |
|                                                    | | *(variantes de las anteriores)*      |                                                     |
+----------------------------------------------------+----------------------------------------+-----------------------------------------------------+
| Nombre de la persona a que se asignó el contrato   | **string**                             | | awards.suppliers.id                               |
|                                                    |                                        | | awards.suppliers.name                             |
|                                                    |                                        | | *Para parties.role = "supplier":*                 |
|                                                    |                                        | | parties.id                                        |
|                                                    |                                        | | parties.name                                      |
+----------------------------------------------------+----------------------------------------+-----------------------------------------------------+
| Fecha de celebración del Contrato                  | **date**                               | contracts.dateSigned                                |
+----------------------------------------------------+----------------------------------------+-----------------------------------------------------+
| Monto del Contrato                                 | **number**                             | | awards.value.amount                               |
|                                                    |                                        | | contracts.value.amount                            |
+----------------------------------------------------+----------------------------------------+-----------------------------------------------------+
| Unidad Administrativa que celebró el Contrato      | **string**                             | | tender.procuringEntity.id                         |
|                                                    |                                        | | tender.procuringEntity.name                       |
|                                                    |                                        | | buyer.id                                          |
|                                                    |                                        | | buyer.name                                        |
|                                                    |                                        | | *Para parties.role = "buyer":*                    |
|                                                    |                                        | | parties.id                                        |
|                                                    |                                        | | parties.name                                      |
+----------------------------------------------------+----------------------------------------+-----------------------------------------------------+
| Objeto del Contrato                                | **string**                             | | tender.title                                      |
|                                                    |                                        | | awards.title                                      |
|                                                    |                                        | | contracts.title                                   |
+----------------------------------------------------+----------------------------------------+-----------------------------------------------------+
| Fecha Inicio del Contrato                          | **date**                               | contracts.period.startDate                          |
+----------------------------------------------------+----------------------------------------+-----------------------------------------------------+
| Fecha de Terminación del Contrato                  | **date**                               | contracts.period.endDate                            |
+----------------------------------------------------+----------------------------------------+-----------------------------------------------------+
| Documento: Sitio en Internet                       | **string**                             | awards.documents.url                                |
+----------------------------------------------------+----------------------------------------+-----------------------------------------------------+
| Convenio Modificatorio                             | | **string**                           | contracts.amendments.id                             |
|                                                    | | "Si"                                 |                                                     |
|                                                    | | "No"                                 |                                                     |
+----------------------------------------------------+----------------------------------------+-----------------------------------------------------+

Mapeos a codelists OCDS
~~~~~~~~~~~~~~~~~~~~~~~

Tipos de Procedimiento (tender.procurementMethod)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

+----------------------------------------------------------------+--------------+
| VALOR ORIGINAL                                                 | VALOR OCDS   |
+================================================================+==============+
| LICITACI N P BLICA                                             | open         |
+----------------------------------------------------------------+--------------+
| LICITACIÓN PÚBLICA                                             | open         |
+----------------------------------------------------------------+--------------+
| LICITACION PÚBLICA                                             | open         |
+----------------------------------------------------------------+--------------+
| LICITACION PUBLICA NACIONAL                                    | open         |
+----------------------------------------------------------------+--------------+
| LICITACIÓN PÚBLICA NACIONAL                                    | open         |
+----------------------------------------------------------------+--------------+
| LICITACION PUBLICA NACIONAL AMPLIACION                         | open         |
+----------------------------------------------------------------+--------------+
| LICITACION PUBLICA INTERNACIONAL                               | open         |
+----------------------------------------------------------------+--------------+
| LICITACION PÚBLICA INTERNACIONAL                               | open         |
+----------------------------------------------------------------+--------------+
| LICITACIÓN PUBLICA INTERNACIONAL                               | open         |
+----------------------------------------------------------------+--------------+
| LICITACIÓN PÚBLICA INTERNACIONAL                               | open         |
+----------------------------------------------------------------+--------------+
| LICITACION PUBLICA ART. 27 FRACCIÓN I Y ART. 41 - LOPSRM       | open         |
+----------------------------------------------------------------+--------------+
| LICITACIÓN PÚBLICA 26-I-LAASSP                                 | open         |
+----------------------------------------------------------------+--------------+
| LICITACIÓN PÚBLICA ART. 26-I-LAASSP                            | open         |
+----------------------------------------------------------------+--------------+
| OTRO                                                           | open         |
+----------------------------------------------------------------+--------------+
| OTROS                                                          | open         |
+----------------------------------------------------------------+--------------+
| INVITACIÓN 26-II-LAASSP                                        | limited      |
+----------------------------------------------------------------+--------------+
| INVITACIÓN A 3 ART. 41-X-LAASSP                                | limited      |
+----------------------------------------------------------------+--------------+
| INVITACION A TRES PERSONAS                                     | limited      |
+----------------------------------------------------------------+--------------+
| INVITACIÓN A TRES PERSONAS                                     | limited      |
+----------------------------------------------------------------+--------------+
| INVITACION A CUANDO MENOS TRES PERSONAS                        | limited      |
+----------------------------------------------------------------+--------------+
| INVITACIÓN A CUANDO MENOS TRES PERSONAS                        | limited      |
+----------------------------------------------------------------+--------------+
| INVITACION A CUENDO MENOS TRES PERSONAS                        | limited      |
+----------------------------------------------------------------+--------------+
| INVITACIÓN A CUANDO MENOS TRES PERSONAS 26-II-LAASSP           | limited      |
+----------------------------------------------------------------+--------------+
| INVITACIÓN TRES PERSONAS                                       | limited      |
+----------------------------------------------------------------+--------------+
| INVITACIÓN ART. 26-II-LAASSP                                   | limited      |
+----------------------------------------------------------------+--------------+
| ADJUDICACI N DIRECTA                                           | direct       |
+----------------------------------------------------------------+--------------+
| ADJUDICACIÓN DIRECTA                                           | direct       |
+----------------------------------------------------------------+--------------+
| ADJUDICACION DIRECTA                                           | direct       |
+----------------------------------------------------------------+--------------+
| ADJUDICACIÓN DIRECTA ART. 27 FRACCIÓN III Y ART. 43 - LOPSRM   | direct       |
+----------------------------------------------------------------+--------------+
| ADJUDICACIÓN DIRECTA 41-I-LAASSP                               | direct       |
+----------------------------------------------------------------+--------------+
| ADJUDICACIÓN DIRECTA 41-III-LAASSP                             | direct       |
+----------------------------------------------------------------+--------------+
| ADJUDICACIÓN DIRECTA 41-X Y XIV-LAASSP                         | direct       |
+----------------------------------------------------------------+--------------+
| ADJUDICACIÓN DIRECTA ART-1-LAASSP                              | direct       |
+----------------------------------------------------------------+--------------+
| ADJUDICACIÓN DIRECTA ART. 1-LAASSP                             | direct       |
+----------------------------------------------------------------+--------------+
| ADJUDICACIÓN DIRECTA ART. 41-I-LAASSP                          | direct       |
+----------------------------------------------------------------+--------------+
| ADJUDICACIÓN DIRECTA ART. 41-III-LAASSP                        | direct       |
+----------------------------------------------------------------+--------------+
| ADJUDICACIÓN DIRECTA ART. 41-V-LAASSP                          | direct       |
+----------------------------------------------------------------+--------------+
| ADJUDICACIÓN DIRECTA ART. 42-LAASSP                            | direct       |
+----------------------------------------------------------------+--------------+
| ADJUDICACION DIRECTA., ART. 1-LAASSP                           | direct       |
+----------------------------------------------------------------+--------------+
| ADJUDICACION DIRECTA                                           | direct       |
+----------------------------------------------------------------+--------------+
