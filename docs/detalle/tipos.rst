Tipos de datos
==============

company
-------

Popolo Oranization JSON Schema:

::

   {
     "$schema": "http://json-schema.org/draft-03/schema#",
     "id": "http://www.popoloproject.com/schemas/organization.json#",
     "title": "Organization",
     "description": "A group with a common purpose or reason for existence that goes beyond the set of people belonging to it",
     "type": "object",
     "properties": {
       "id": {
         "description": "The organization's unique identifier",
         "type": ["string", "null"]
       },
       "name": {
         "description": "A primary name, e.g. a legally recognized name",
         "type": ["string", "null"]
       },
       "other_names": {
         "description": "Alternate or former names",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/other_name.json#"
         }
       },
       "identifiers": {
         "description": "Issued identifiers",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/identifier.json#"
         }
       },
       "classification": {
         "description": "An organization category, e.g. committee",
         "type": ["string", "null"]
       },
       "parent_id": {
         "description": "The ID of the organization that contains this organization",
         "type": ["string", "null"]
       },
       "parent": {
         "description": "The organization that contains this organization",
         "$ref": "http://www.popoloproject.com/schemas/organization.json#"
       },
       "area_id": {
         "description": "The ID of the geographic area to which this organization is related",
         "type": ["string", "null"]
       },
       "area": {
         "description": "The geographic area to which this organization is related",
         "$ref": "http://www.popoloproject.com/schemas/area.json#"
       },
       "abstract": {
         "description": "A one-line description of an organization",
         "type": ["string", "null"]
       },
       "description": {
         "description": "An extended description of an organization",
         "type": ["string", "null"]
       },
       "founding_date": {
         "description": "A date of founding",
         "type": ["string", "null"],
         "pattern": "^[0-9]{4}(-[0-9]{2}){0,2}$"
       },
       "dissolution_date": {
         "description": "A date of dissolution",
         "type": ["string", "null"],
         "pattern": "^[0-9]{4}(-[0-9]{2}){0,2}$"
       },
       "image": {
         "description": "A URL of an image",
         "type": ["string", "null"],
         "format": "uri"
       },
       "contact_details": {
         "description": "Means of contacting the organization",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/contact_detail.json#"
         }
       },
       "links": {
         "description": "URLs to documents about the organization",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/link.json#"
         }
       },
       "memberships": {
         "description": "The memberships of the members of the organization and of the organization itself",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/membership.json#"
         }
       },
       "posts": {
         "description": "Posts within the organization",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/post.json#"
         }
       },
       "motions": {
         "description": "Motions within the organization",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/motion.json#"
         }
       },
       "vote_events": {
         "description": "Vote events in which members of the organization are voting",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/vote_event.json#"
         }
       },
       "votes": {
         "description": "Votes cast by the organization",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/vote.json#"
         }
       },
       "children": {
         "description": "The sub-organizations of the organization",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/organization.json#"
         }
       },
       "created_at": {
         "description": "The time at which the resource was created",
         "type": ["string", "null"],
         "format": "date-time"
       },
       "updated_at": {
         "description": "The time at which the resource was last modified",
         "type": ["string", "null"],
         "format": "date-time"
       },
       "sources": {
         "description": "URLs to documents from which the resource is derived",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/link.json#"
         }
       }
     }
   }

Example:

::

   {
     "id": "abc-inc",
     "name": "ABC, Inc.",
     "other_names": [
       {
         "name": "Bob's Diner",
         "start_date": "1950-01-01",
         "end_date": "1954-12-31"
       },
       {
         "name": "Joe's Diner",
         "start_date": "1955-01-01"
       },
       {
         "name": "Famous Joe's"
       }
     ],
     "identifiers": [
       {
         "identifier": "123456789",
         "scheme": "DUNS"
       },
       {
         "identifier": "US0123456789",
         "scheme": "ISIN"
       }
     ],
     "classification": "Corporation",
     "parent_id": "holding-company-corp",
     "founding_date": "1950-01-01",
     "dissolution_date": "2000-01-01",
     "image": "http://example.com/pub/photos/logo.gif",
     "contact_details": [
       {
         "type": "voice",
         "label": "Toll-free number",
         "value": "+1-800-555-0199",
         "note": "9am to 5pm weekdays"
       }
     ],
     "links": [
       {
         "url": "http://en.wikipedia.org/wiki/Joe's_Diner_(placeholder_name)",
         "note": "Wikipedia page"
       }
     ]
   }

institution
-----------

Popolo Oranization JSON Schema:

::

   {
     "$schema": "http://json-schema.org/draft-03/schema#",
     "id": "http://www.popoloproject.com/schemas/organization.json#",
     "title": "Organization",
     "description": "A group with a common purpose or reason for existence that goes beyond the set of people belonging to it",
     "type": "object",
     "properties": {
       "id": {
         "description": "The organization's unique identifier",
         "type": ["string", "null"]
       },
       "name": {
         "description": "A primary name, e.g. a legally recognized name",
         "type": ["string", "null"]
       },
       "other_names": {
         "description": "Alternate or former names",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/other_name.json#"
         }
       },
       "identifiers": {
         "description": "Issued identifiers",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/identifier.json#"
         }
       },
       "classification": {
         "description": "An organization category, e.g. committee",
         "type": ["string", "null"]
       },
       "parent_id": {
         "description": "The ID of the organization that contains this organization",
         "type": ["string", "null"]
       },
       "parent": {
         "description": "The organization that contains this organization",
         "$ref": "http://www.popoloproject.com/schemas/organization.json#"
       },
       "area_id": {
         "description": "The ID of the geographic area to which this organization is related",
         "type": ["string", "null"]
       },
       "area": {
         "description": "The geographic area to which this organization is related",
         "$ref": "http://www.popoloproject.com/schemas/area.json#"
       },
       "abstract": {
         "description": "A one-line description of an organization",
         "type": ["string", "null"]
       },
       "description": {
         "description": "An extended description of an organization",
         "type": ["string", "null"]
       },
       "founding_date": {
         "description": "A date of founding",
         "type": ["string", "null"],
         "pattern": "^[0-9]{4}(-[0-9]{2}){0,2}$"
       },
       "dissolution_date": {
         "description": "A date of dissolution",
         "type": ["string", "null"],
         "pattern": "^[0-9]{4}(-[0-9]{2}){0,2}$"
       },
       "image": {
         "description": "A URL of an image",
         "type": ["string", "null"],
         "format": "uri"
       },
       "contact_details": {
         "description": "Means of contacting the organization",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/contact_detail.json#"
         }
       },
       "links": {
         "description": "URLs to documents about the organization",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/link.json#"
         }
       },
       "memberships": {
         "description": "The memberships of the members of the organization and of the organization itself",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/membership.json#"
         }
       },
       "posts": {
         "description": "Posts within the organization",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/post.json#"
         }
       },
       "motions": {
         "description": "Motions within the organization",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/motion.json#"
         }
       },
       "vote_events": {
         "description": "Vote events in which members of the organization are voting",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/vote_event.json#"
         }
       },
       "votes": {
         "description": "Votes cast by the organization",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/vote.json#"
         }
       },
       "children": {
         "description": "The sub-organizations of the organization",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/organization.json#"
         }
       },
       "created_at": {
         "description": "The time at which the resource was created",
         "type": ["string", "null"],
         "format": "date-time"
       },
       "updated_at": {
         "description": "The time at which the resource was last modified",
         "type": ["string", "null"],
         "format": "date-time"
       },
       "sources": {
         "description": "URLs to documents from which the resource is derived",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/link.json#"
         }
       }
     }
   }

Example:

::

   {
     "id": "abc-inc",
     "name": "ABC, Inc.",
     "other_names": [
       {
         "name": "Bob's Diner",
         "start_date": "1950-01-01",
         "end_date": "1954-12-31"
       },
       {
         "name": "Joe's Diner",
         "start_date": "1955-01-01"
       },
       {
         "name": "Famous Joe's"
       }
     ],
     "identifiers": [
       {
         "identifier": "123456789",
         "scheme": "DUNS"
       },
       {
         "identifier": "US0123456789",
         "scheme": "ISIN"
       }
     ],
     "classification": "Corporation",
     "parent_id": "holding-company-corp",
     "founding_date": "1950-01-01",
     "dissolution_date": "2000-01-01",
     "image": "http://example.com/pub/photos/logo.gif",
     "contact_details": [
       {
         "type": "voice",
         "label": "Toll-free number",
         "value": "+1-800-555-0199",
         "note": "9am to 5pm weekdays"
       }
     ],
     "links": [
       {
         "url": "http://en.wikipedia.org/wiki/Joe's_Diner_(placeholder_name)",
         "note": "Wikipedia page"
       }
     ]
   }

person
------

Popolo Person JSON Schema:

::

   {
     "$schema": "http://json-schema.org/draft-03/schema#",
     "id": "http://www.popoloproject.com/schemas/person.json#",
     "title": "Person",
     "description": "A real person, alive or dead",
     "type": "object",
     "properties": {
       "id": {
         "description": "The person's unique identifier",
         "type": ["string", "null"]
       },
       "name": {
         "description": "A person's preferred full name",
         "type": ["string", "null"]
       },
       "other_names": {
         "description": "Alternate or former names",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/other_name.json#"
         }
       },
       "identifiers": {
         "description": "Issued identifiers",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/identifier.json#"
         }
       },
       "family_name": {
         "description": "One or more family names",
         "type": ["string", "null"]
       },
       "given_name": {
         "description": "One or more primary given names",
         "type": ["string", "null"]
       },
       "additional_name": {
         "description": "One or more secondary given names",
         "type": ["string", "null"]
       },
       "honorific_prefix": {
         "description": "One or more honorifics preceding a person's name",
         "type": ["string", "null"]
       },
       "honorific_suffix": {
         "description": "One or more honorifics following a person's name",
         "type": ["string", "null"]
       },
       "patronymic_name": {
         "description": "One or more patronymic names",
         "type": ["string", "null"]
       },
       "sort_name": {
         "description": "A name to use in a lexicographically ordered list",
         "type": ["string", "null"]
       },
       "email": {
         "description": "A preferred email address",
         "type": ["string", "null"],
         "format": "email"
       },
       "gender": {
         "description": "A gender",
         "type": ["string", "null"]
       },
       "birth_date": {
         "description": "A date of birth",
         "type": ["string", "null"],
         "pattern": "^[0-9]{4}(-[0-9]{2}){0,2}$"
       },
       "death_date": {
         "description": "A date of death",
         "type": ["string", "null"],
         "pattern": "^[0-9]{4}(-[0-9]{2}){0,2}$"
       },
       "image": {
         "description": "A URL of a head shot",
         "type": ["string", "null"],
         "format": "uri"
       },
       "summary": {
         "description": "A one-line account of a person's life",
         "type": ["string", "null"]
       },
       "biography": {
         "description": "An extended account of a person's life",
         "type": ["string", "null"]
       },
       "national_identity": {
         "description": "A national identity",
         "type": ["string", "null"]
       },
       "contact_details": {
         "description": "Means of contacting the person",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/contact_detail.json#"
         }
       },
       "links": {
         "description": "URLs to documents about the person",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/link.json#"
         }
       },
       "memberships": {
         "description": "The person's memberships",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/membership.json#"
         }
       },
       "motions": {
         "description": "The person's motions",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/motion.json#"
         }
       },
       "speeches": {
         "description": "The person's speeches",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/speech.json#"
         }
       },
       "votes": {
         "description": "Votes cast by the person",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/vote.json#"
         }
       },
       "created_at": {
         "description": "The time at which the resource was created",
         "type": ["string", "null"],
         "format": "date-time"
       },
       "updated_at": {
         "description": "The time at which the resource was last modified",
         "type": ["string", "null"],
         "format": "date-time"
       },
       "sources": {
         "description": "URLs to documents from which the resource is derived",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/link.json#"
         }
       }
     }
   }

Example:

::

   {
     "id": "john-q-public",
     "name": "Mr. John Q. Public, Esq.",
     "other_names": [
       {
         "name": "Mr. Ziggy Q. Public, Esq.",
         "start_date": "1920-01",
         "end_date": "1949-12-31",
         "note": "Birth name"
       },
       {
         "name": "Dragonsbane",
         "note": "LARP character name"
       }
     ],
     "identifiers": [
       {
         "identifier": "046454286",
         "scheme": "SIN"
       }
     ],
     "email": "jqpublic@xyz.example.com",
     "gender": "male",
     "birth_date": "1920-01",
     "death_date": "2010-01-01",
     "image": "http://example.com/pub/photos/jqpublic.gif",
     "summary": "A hypothetical member of society deemed a 'common man'",
     "biography": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...",
     "national_identity": "Scottish",
     "contact_details": [
       {
         "type": "cell",
         "label": "Mobile number",
         "value": "+1-555-555-0100",
         "note": "Free evenings and weekends"
       }
     ],
     "links": [
       {
         "url": "http://en.wikipedia.org/wiki/John_Q._Public",
         "note": "Wikipedia page"
       }
     ]

membership
----------

Popolo Membership JSON Schema:

::

   {
     "$schema": "http://json-schema.org/draft-03/schema#",
     "id": "http://www.popoloproject.com/schemas/membership.json#",
     "title": "Membership",
     "description": "A relationship between a member and an organization",
     "type": "object",
     "properties": {
       "id": {
         "description": "The membership's unique identifier",
         "type": ["string", "null"]
       },
       "label": {
         "description": "A label describing the membership",
         "type": ["string", "null"]
       },
       "role": {
         "description": "The role that the member fulfills in the organization",
         "type": ["string", "null"]
       },
       "member": {
         "description": "The person or organization that is a member of the organization",
         "type": ["object", "null"]
       },
       "person_id": {
         "description": "The ID of the person who is a member of the organization",
         "type": ["string", "null"]
       },
       "person": {
         "description": "The person who is a member of the organization",
         "$ref": "http://www.popoloproject.com/schemas/person.json#"
       },
       "organization_id": {
         "description": "The ID of the organization in which the person or organization is a member",
         "type": ["string", "null"]
       },
       "organization": {
         "description": "The organization in which the person or organization is a member",
         "$ref": "http://www.popoloproject.com/schemas/organization.json#"
       },
       "post_id": {
         "description": "The ID of the post held by the member in the organization through this membership",
         "type": ["string", "null"]
       },
       "post": {
         "description": "The post held by the member in the organization through this membership",
         "$ref": "http://www.popoloproject.com/schemas/post.json#"
       },
       "on_behalf_of_id": {
         "description": "The ID of the organization on whose behalf the person is a member of the organization",
         "type": ["string", "null"]
       },
       "on_behalf_of": {
         "description": "The organization on whose behalf the person is a member of the organization",
         "$ref": "http://www.popoloproject.com/schemas/organization.json#"
       },
       "area_id": {
         "description": "The ID of the geographic area to which this membership is related",
         "type": ["string", "null"]
       },
       "area": {
         "description": "The geographic area to which this membership is related",
         "$ref": "http://www.popoloproject.com/schemas/area.json#"
       },
       "start_date": {
         "description": "The date on which the relationship began",
         "type": ["string", "null"],
         "pattern": "^[0-9]{4}((-[0-9]{2}){0,2}|(-[0-9]{2}){2}T[0-9]{2}(:[0-9]{2}){0,2}(Z|[+-][0-9]{2}(:[0-9]{2})?))$"
       },
       "end_date": {
         "description": "The date on which the relationship ended",
         "type": ["string", "null"],
         "pattern": "^[0-9]{4}((-[0-9]{2}){0,2}|(-[0-9]{2}){2}T[0-9]{2}(:[0-9]{2}){0,2}(Z|[+-][0-9]{2}(:[0-9]{2})?))$"
       },
       "contact_details": {
         "description": "Means of contacting the member of the organization",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/contact_detail.json#"
         }
       },
       "links": {
         "description": "URLs to documents about the membership",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/link.json#"
         }
       },
       "created_at": {
         "description": "The time at which the resource was created",
         "type": ["string", "null"],
         "format": "date-time"
       },
       "updated_at": {
         "description": "The time at which the resource was last modified",
         "type": ["string", "null"],
         "format": "date-time"
       },
       "sources": {
         "description": "URLs to documents from which the resource is derived",
         "type": "array",
         "items": {
           "$ref": "http://www.popoloproject.com/schemas/link.json#"
         }
       }
     }
   }

Example:

::

   {
     "id": "593",
     "label": "Kitchen assistant at Joe's Diner",
     "role": "Kitchen assistant",
     "person_id": "john-q-public",
     "organization_id": "abc-inc",
     "post_id": "abc-inc-kitchen-assistant",
     "start_date": "1970-01",
     "end_date": "1971-12-31",
     "contact_details": [
       {
         "type": "voice",
         "label": "Take-out and delivery",
         "value": "+1-800-555-0199",
         "note": "12pm to midnight"
       }
     ],
     "links": [
       {
         "url": "http://example.com/abc-inc/staff",
         "note": "ABC, Inc. staff page"
       }
     ]

   }

contract (falta documentar)
---------------------------

Basado en OCDS pero sin compilar releases.

recordPackage
-------------

OCDS Record Package:

::

   {
     "id": "http://standard.open-contracting.org/schema/1__1__3/record-package-schema.json",
     "$schema": "http://json-schema.org/draft-04/schema#",
     "title": "Schema for an Open Contracting Record package",
     "description": "The record package contains a list of records along with some publishing metadata. The records pull together all the releases under a single Open Contracting ID and compile them into the latest version of the information along with the history of any data changes.",
     "type": "object",
     "properties": {
       "uri": {
         "title": "Package identifier",
         "description": "The URI of this package that identifies it uniquely in the world.",
         "type": "string",
         "format": "uri"
       },
       "version": {
         "title": "OCDS schema version",
         "description": "The version of the OCDS schema used in this package, expressed as major.minor For example: 1.0 or 1.1",
         "type": "string",
         "pattern": "^(\\d+\\.)(\\d+)$"
       },
       "extensions": {
         "title": "OCDS extensions",
         "description": "An array of OCDS extensions used in this package. Each entry should be a URL to the extension.json file for that extension.",
         "type": "array",
         "items": {
           "type": "string",
           "format": "uri"
         }
       },
       "publisher": {
         "description": "Information to uniquely identify the publisher of this package.",
         "type": "object",
         "properties": {
           "name": {
             "title": "Name",
             "description": "The name of the organization or department responsible for publishing this data.",
             "type": "string"
           },
           "scheme": {
             "title": "Scheme",
             "description": "The scheme that holds the unique identifiers used to identify the item being identified.",
             "type": [
               "string",
               "null"
             ]
           },
           "uid": {
             "title": "uid",
             "description": "The unique ID for this entity under the given ID scheme. Note the use of 'uid' rather than 'id'. See issue #245.",
             "type": [
               "string",
               "null"
             ]
           },
           "uri": {
             "title": "URI",
             "description": "A URI to identify the publisher.",
             "type": [
               "string",
               "null"
             ],
             "format": "uri"
           }
         },
         "required": [
           "name"
         ]
       },
       "license": {
         "title": "License",
         "description": "A link to the license that applies to the data in this data package. [Open Definition Conformant](http://opendefinition.org/licenses/) licenses are strongly recommended. The canonical URI of the license should be used. Documents linked from this file may be under other license conditions.",
         "type": [
           "string",
           "null"
         ],
         "format": "uri"
       },
       "publicationPolicy": {
         "title": "Publication policy",
         "description": "A link to a document describing the publishers publication policy.",
         "type": [
           "string",
           "null"
         ],
         "format": "uri"
       },
       "publishedDate": {
         "title": "Published date",
         "description": "The date that this package was published. If this package is generated 'on demand', this date should reflect the date of the last change to the underlying contents of the package.",
         "type": "string",
         "format": "date-time"
       },
       "packages": {
         "title": "Packages",
         "description": "A list of URIs of all the release packages that were used to create this record package.",
         "type": "array",
         "minItems": 1,
         "items": {
           "type": "string",
           "format": "uri"
         },
         "uniqueItems": true
       },
       "records": {
         "title": "Records",
         "description": "The records for this data package.",
         "type": "array",
         "minItems": 1,
         "items": {
           "$ref": "#/definitions/record"
         },
         "uniqueItems": true
       }
     },
     "required": [
       "uri",
       "publisher",
       "publishedDate",
       "records",
       "version"
     ],
     "definitions": {
       "record": {
         "title": "Record",
         "type": "object",
         "properties": {
           "ocid": {
             "title": "Open Contracting ID",
             "description": "A unique identifier that identifies the unique Open Contracting Process. For more information see: http://standard.open-contracting.org/latest/en/getting_started/contracting_process/",
             "type": "string"
           },
           "releases": {
             "title": "Releases",
             "description": "An array of linking identifiers or releases",
             "oneOf": [
               {
                 "title": "Linked releases",
                 "description": "A list of objects that identify the releases associated with this Open Contracting ID. The releases MUST be sorted into date order in the array, from oldest (at position 0) to newest (last).",
                 "type": "array",
                 "items": {
                   "description": "Information to uniquely identify the release.",
                   "type": "object",
                   "properties": {
                     "url": {
                       "description": "The URL of the release which contains the URL of the package with the releaseID appended using a fragment identifier e.g. http://standard.open-contracting.org/latest/en/examples/tender.json#ocds-213czf-000-00001",
                       "type": [
                         "string",
                         "null"
                       ],
                       "format": "uri"
                     },
                     "date": {
                       "title": "Release Date",
                       "description": "The date of the release, should match `date` at the root level of the release. This is used to sort the releases in the list into date order.",
                       "type": "string",
                       "format": "date-time"
                     },
                     "tag": {
                       "title": "Release Tag",
                       "description": "The tag should match the tag in the release. This provides additional context when reviewing a record to see what types of releases are included for this ocid.",
                       "type": "array",
                       "items": {
                         "type": "string",
                         "enum": [
                           "planning",
                           "planningUpdate",
                           "tender",
                           "tenderAmendment",
                           "tenderUpdate",
                           "tenderCancellation",
                           "award",
                           "awardUpdate",
                           "awardCancellation",
                           "contract",
                           "contractUpdate",
                           "contractAmendment",
                           "implementation",
                           "implementationUpdate",
                           "contractTermination",
                           "compiled"
                         ]
                       },
                       "codelist": "releaseTag.csv",
                       "openCodelist": false,
                       "minItems": 1
                     }
                   },
                   "required": [
                     "url",
                     "date"
                   ]
                 },
                 "minItems": 1
               },
               {
                 "title": "Embedded releases",
                 "description": "A list of releases, with all the data. The releases MUST be sorted into date order in the array, from oldest (at position 0) to newest (last).",
                 "type": "array",
                 "items": {
                   "$ref": "http://standard.open-contracting.org/schema/1__1__3/release-schema.json"
                 },
                 "minItems": 1
               }
             ]
           },
           "compiledRelease": {
             "title": "Compiled release",
             "description": "This is the latest version of all the contracting data, it has the same schema as an open contracting release.",
             "$ref": "http://standard.open-contracting.org/schema/1__1__3/release-schema.json"
           },
           "versionedRelease": {
             "title": "Versioned release",
             "description": "This contains the history of the data in the compiledRecord. With all versions of the information and the release they came from.",
             "$ref": "http://standard.open-contracting.org/schema/1__1__3/versioned-release-validation-schema.json"
           }
         },
         "required": [
           "ocid",
           "releases"
         ]
       }
     }
   }

OCDS Release:

::


   {

       "id": "http://standard.open-contracting.org/schema/1__1__3/release-schema.json",
       "$schema": "http://json-schema.org/draft-04/schema#",
       "title": "Schema for an Open Contracting Release",
       "description": "Each release provides data about a single contracting process at a particular point in time. Releases can be used to notify users of new tenders, awards, contracts and other updates. Releases may repeat or update information provided previously in this contracting process. One contracting process may have many releases. A 'record' of a contracting process follows the same structure as a release, but combines information from multiple points in time into a single summary.",
       "type": "object",
       "properties": {
           "ocid": {
               "title": "Open Contracting ID",
               "description": "A globally unique identifier for this Open Contracting Process. Composed of a publisher prefix and an identifier for the contracting process. For more information see the [Open Contracting Identifier guidance](http://standard.open-contracting.org/latest/en/schema/identifiers/)",
               "type": "string",
               "minLength": 1
           },
           "id": {
               "title": "Release ID",
               "description": "An identifier for this particular release of information. A release identifier must be unique within the scope of its related contracting process (defined by a common ocid), and unique within any release package it appears in. A release identifier must not contain the # character.",
               "type": "string",
               "minLength": 1,
               "omitWhenMerged": true
           },
           "date": {
               "title": "Release Date",
               "description": "The date this information was first released, or published.",
               "type": "string",
               "format": "date-time",
               "omitWhenMerged": true
           },
           "tag": {
               "title": "Release Tag",
               "description": "One or more values from the [releaseTag codelist](http://standard.open-contracting.org/latest/en/schema/codelists/#release-tag). Tags may be used to filter release and to understand the kind of information that a release might contain.",
               "type": "array",
               "items": {
                   "type": "string",
                   "enum": [
                       "planning",
                       "planningUpdate",
                       "tender",
                       "tenderAmendment",
                       "tenderUpdate",
                       "tenderCancellation",
                       "award",
                       "awardUpdate",
                       "awardCancellation",
                       "contract",
                       "contractUpdate",
                       "contractAmendment",
                       "implementation",
                       "implementationUpdate",
                       "contractTermination",
                       "compiled"
                   ]
               },
               "codelist": "releaseTag.csv",
               "openCodelist": false,
               "minItems": 1
           },
           "initiationType": {
               "title": "Initiation type",
               "description": "String specifying the type of initiation process used for this contract, taken from the [initiationType](http://standard.open-contracting.org/latest/en/schema/codelists/#initiation-type) codelist. Currently only tender is supported.",
               "type": "string",
               "enum": [
                   "tender"
               ],
               "codelist": "initiationType.csv",
               "openCodelist": false
           },
           "parties": {
               "title": "Parties",
               "description": "Information on the parties (organizations, economic operators and other participants) who are involved in the contracting process and their roles, e.g. buyer, procuring entity, supplier etc. Organization references elsewhere in the schema are used to refer back to this entries in this list.",
               "type": "array",
               "items": {
                   "$ref": "#/definitions/Organization"
               },
               "uniqueItems": true
           },
           "buyer": {
               "title": "Buyer",
               "description": "A buyer is an entity whose budget will be used to pay for goods, works or services related to a contract. This may be different from the procuring entity who may be specified in the tender data.",
               "$ref": "#/definitions/OrganizationReference"
           },
           "planning": {
               "title": "Planning",
               "description": "Information from the planning phase of the contracting process. This includes information related to the process of deciding what to contract, when and how.",
               "$ref": "#/definitions/Planning"
           },
           "tender": {
               "title": "Tender",
               "description": "The activities undertaken in order to enter into a contract.",
               "$ref": "#/definitions/Tender"
           },
           "awards": {
               "title": "Awards",
               "description": "Information from the award phase of the contracting process. There may be more than one award per contracting process e.g. because the contract is split among different providers, or because it is a standing offer.",
               "type": "array",
               "items": {
                   "$ref": "#/definitions/Award"
               },
               "uniqueItems": true
           },
           "contracts": {
               "title": "Contracts",
               "description": "Information from the contract creation phase of the procurement process.",
               "type": "array",
               "items": {
                   "$ref": "#/definitions/Contract"
               },
               "uniqueItems": true
           },
           "language": {
               "title": "Release language",
               "description": "Specifies the default language of the data using either two-letter [ISO639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes), or extended [BCP47 language tags](http://www.w3.org/International/articles/language-tags/). The use of lowercase two-letter codes from [ISO639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) is strongly recommended.",
               "type": [
                   "string",
                   "null"
               ],
               "default": "en"
           },
           "relatedProcesses": {
               "uniqueItems": true,
               "items": {
                   "$ref": "#/definitions/RelatedProcess"
               },
               "description": "If this process follows on from one or more prior process, represented under a separate open contracting identifier (ocid) then details of the related process can be provided here. This is commonly used to relate mini-competitions to their parent frameworks, full tenders to a pre-qualification phase, or individual tenders to a broad planning process.",
               "title": "Related processes",
               "type": "array"
           }
       },
       "required": [
           "ocid",
           "id",
           "date",
           "tag",
           "initiationType"
       ],
       "definitions": {
           "Planning": {
               "title": "Planning",
               "description": "Information from the planning phase of the contracting process. Note that many other fields may be filled in a planning release, in the appropriate fields in other schema sections, these would likely be estimates at this stage e.g. totalValue in tender",
               "type": "object",
               "properties": {
                   "rationale": {
                       "title": "Rationale",
                       "description": "The rationale for the procurement provided in free text. More detail can be provided in an attached document.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "budget": {
                       "title": "Budget",
                       "description": "Details of the budget that funds this contracting process.",
                       "$ref": "#/definitions/Budget"
                   },
                   "documents": {
                       "title": "Documents",
                       "description": "A list of documents related to the planning process.",
                       "type": "array",
                       "items": {
                           "$ref": "#/definitions/Document"
                       }
                   },
                   "milestones": {
                       "title": "Planning milestones",
                       "description": "A list of milestones associated with the planning stage.",
                       "type": "array",
                       "items": {
                           "$ref": "#/definitions/Milestone"
                       }
                   }
               },
               "patternProperties": {
                   "^(rationale_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   }
               }
           },
           "Tender": {
               "title": "Tender",
               "description": "Data regarding tender process - publicly inviting prospective contractors to submit bids for evaluation and selecting a winner or winners.",
               "type": "object",
               "required": [
                   "id"
               ],
               "properties": {
                   "id": {
                       "title": "Tender ID",
                       "description": "An identifier for this tender process. This may be the same as the ocid, or may be drawn from an internally held identifier for this tender.",
                       "type": [
                           "string",
                           "integer"
                       ],
                       "minLength": 1,
                       "versionId": true
                   },
                   "title": {
                       "title": "Tender title",
                       "description": "A title for this tender. This will often be used by applications as a headline to attract interest, and to help analysts understand the nature of this procurement.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "description": {
                       "title": "Tender description",
                       "description": "A summary description of the tender. This should complement structured information provided using the items array. Descriptions should be short and easy to read. Avoid using ALL CAPS. ",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "status": {
                       "title": "Tender status",
                       "description": "The current status of the tender based on the [tenderStatus codelist](http://standard.open-contracting.org/latest/en/schema/codelists/#tender-status)",
                       "type": [
                           "string",
                           "null"
                       ],
                       "codelist": "tenderStatus.csv",
                       "openCodelist": false,
                       "enum": [
                           "planning",
                           "planned",
                           "active",
                           "cancelled",
                           "unsuccessful",
                           "complete",
                           "withdrawn",
                           null
                       ]
                   },
                   "procuringEntity": {
                       "title": "Procuring entity",
                       "description": "The entity managing the procurement. This may be different from the buyer who pays for, or uses, the items being procured.",
                       "$ref": "#/definitions/OrganizationReference"
                   },
                   "items": {
                       "title": "Items to be procured",
                       "description": "The goods and services to be purchased, broken into line items wherever possible. Items should not be duplicated, but a quantity of 2 specified instead.",
                       "type": "array",
                       "items": {
                           "$ref": "#/definitions/Item"
                       },
                       "uniqueItems": true
                   },
                   "value": {
                       "title": "Value",
                       "description": "The total upper estimated value of the procurement. A negative value indicates that the contracting process may involve payments from the supplier to the buyer (commonly used in concession contracts).",
                       "$ref": "#/definitions/Value"
                   },
                   "minValue": {
                       "title": "Minimum value",
                       "description": "The minimum estimated value of the procurement.  A negative value indicates that the contracting process may involve payments from the supplier to the buyer (commonly used in concession contracts).",
                       "$ref": "#/definitions/Value"
                   },
                   "procurementMethod": {
                       "title": "Procurement method",
                       "description": "Specify tendering method using the [method codelist](http://standard.open-contracting.org/latest/en/schema/codelists/#method). This is a closed codelist. Local method types should be mapped to this list.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "codelist": "method.csv",
                       "openCodelist": false,
                       "enum": [
                           "open",
                           "selective",
                           "limited",
                           "direct",
                           null
                       ]
                   },
                   "procurementMethodDetails": {
                       "title": "Procurement method details",
                       "description": "Additional detail on the procurement method used. This field may be used to provide the local name of the particular procurement method used.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "procurementMethodRationale": {
                       "title": "Procurement method rationale",
                       "description": "Rationale for the chosen procurement method. This is especially important to provide a justification in the case of limited tenders or direct awards.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "mainProcurementCategory": {
                       "title": "Main procurement category",
                       "description": "The primary category describing the main object of this contracting process from the [procurementCategory](http://standard.open-contracting.org/latest/en/schema/codelists/#procurement-category) codelist. This is a closed codelist. Local classifications should be mapped to this list.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "codelist": "procurementCategory.csv",
                       "openCodelist": false,
                       "enum": [
                           "goods",
                           "works",
                           "services",
                           null
                       ]
                   },
                   "additionalProcurementCategories": {
                       "title": "Additional procurement categories",
                       "description": "Any additional categories which describe the objects of this contracting process, from the [extendedProcurementCategory](http://standard.open-contracting.org/latest/en/schema/codelists/#extended-procurement-category) codelist. This is an open codelist. Local categories can be included in this list.",
                       "type": [
                           "array",
                           "null"
                       ],
                       "items": {
                           "type": [
                               "string"
                           ]
                       },
                       "codelist": "extendedProcurementCategory.csv",
                       "openCodelist": true
                   },
                   "awardCriteria": {
                       "title": "Award criteria",
                       "description": "Specify the award criteria for the procurement, using the [award criteria codelist](http://standard.open-contracting.org/latest/en/schema/codelists/#award-criteria)",
                       "type": [
                           "string",
                           "null"
                       ],
                       "codelist": "awardCriteria.csv",
                       "openCodelist": true
                   },
                   "awardCriteriaDetails": {
                       "title": "Award criteria details",
                       "description": "Any detailed or further information on the award or selection criteria.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "submissionMethod": {
                       "title": "Submission method",
                       "description": "Specify the method by which bids must be submitted, in person, written, or electronic auction. Using the [submission method codelist](http://standard.open-contracting.org/latest/en/schema/codelists/#submission-method)",
                       "type": [
                           "array",
                           "null"
                       ],
                       "items": {
                           "type": "string"
                       },
                       "codelist": "submissionMethod.csv",
                       "openCodelist": true
                   },
                   "submissionMethodDetails": {
                       "title": "Submission method details",
                       "description": "Any detailed or further information on the submission method. This may include the address, e-mail address or online service to which bids should be submitted, and any special requirements to be followed for submissions.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "tenderPeriod": {
                       "title": "Tender period",
                       "description": "The period when the tender is open for submissions. The end date is the closing date for tender submissions.",
                       "$ref": "#/definitions/Period"
                   },
                   "enquiryPeriod": {
                       "title": "Enquiry period",
                       "description": "The period during which potential bidders may submit questions and requests for clarification to the entity managing procurement. Details of how to submit enquiries should be provided in attached notices, or in submissionMethodDetails. Structured dates for when responses to questions will be made can be provided using tender milestones.",
                       "$ref": "#/definitions/Period"
                   },
                   "hasEnquiries": {
                       "title": "Has enquiries?",
                       "description": "A true/false field to indicate whether any enquiries were received during the tender process. Structured information on enquiries that were received, and responses to them, can be provided using the enquiries extension.",
                       "type": [
                           "boolean",
                           "null"
                       ]
                   },
                   "eligibilityCriteria": {
                       "title": "Eligibility criteria",
                       "description": "A description of any eligibility criteria for potential suppliers.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "awardPeriod": {
                       "title": "Evaluation and award period",
                       "description": "The period for decision making regarding the contract award. The end date should be the date on which an award decision is due to be finalized. The start date is optional, and may be used to indicate the start of an evaluation period.",
                       "$ref": "#/definitions/Period"
                   },
                   "contractPeriod": {
                       "description": "The period over which the contract is estimated or required to be active. If the tender does not specify explicit dates, the duration field may be used.",
                       "title": "Contract period",
                       "$ref": "#/definitions/Period"
                   },
                   "numberOfTenderers": {
                       "title": "Number of tenderers",
                       "description": "The number of parties who submit a bid.",
                       "type": [
                           "integer",
                           "null"
                       ]
                   },
                   "tenderers": {
                       "title": "Tenderers",
                       "description": "All parties who submit a bid on a tender. More detailed information on bids and the bidding organization can be provided using the optional bid extension.",
                       "type": "array",
                       "items": {
                           "$ref": "#/definitions/OrganizationReference"
                       },
                       "uniqueItems": true
                   },
                   "documents": {
                       "title": "Documents",
                       "description": "All documents and attachments related to the tender, including any notices. See the [documentType codelist](http://standard.open-contracting.org/latest/en/schema/codelists/#document-type) for details of potential documents to include. Common documents include official legal notices of tender, technical specifications, evaluation criteria, and, as a tender process progresses, clarifications and replies to queries.",
                       "type": "array",
                       "items": {
                           "$ref": "#/definitions/Document"
                       }
                   },
                   "milestones": {
                       "title": "Milestones",
                       "description": "A list of milestones associated with the tender.",
                       "type": "array",
                       "items": {
                           "$ref": "#/definitions/Milestone"
                       }
                   },
                   "amendments": {
                       "description": "A tender amendment is a formal change to the tender, and generally involves the publication of a new tender notice/release. The rationale and a description of the changes made can be provided here.",
                       "type": "array",
                       "title": "Amendments",
                       "items": {
                           "$ref": "#/definitions/Amendment"
                       }
                   },
                   "amendment": {
                       "title": "Amendment",
                       "description": "The use of individual amendment objects has been deprecated. From OCDS 1.1 information should be provided in the amendments array.",
                       "$ref": "#/definitions/Amendment",
                       "deprecated": {
                           "description": "The single amendment object has been deprecated in favour of including amendments in an amendments (plural) array.",
                           "deprecatedVersion": "1.1"
                       }
                   }
               },
               "patternProperties": {
                   "^(title_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "^(description_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "^(procurementMethodRationale_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "^(awardCriteriaDetails_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "^(submissionMethodDetails_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "^(eligibilityCriteria_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   }
               }
           },
           "Award": {
               "title": "Award",
               "description": "An award for the given procurement. There may be more than one award per contracting process e.g. because the contract is split among different providers, or because it is a standing offer.",
               "type": "object",
               "required": [
                   "id"
               ],
               "properties": {
                   "id": {
                       "title": "Award ID",
                       "description": "The identifier for this award. It must be unique and cannot change within the Open Contracting Process it is part of (defined by a single ocid). See the [identifier guidance](http://standard.open-contracting.org/latest/en/schema/identifiers/) for further details.",
                       "type": [
                           "string",
                           "integer"
                       ],
                       "minLength": 1
                   },
                   "title": {
                       "title": "Title",
                       "description": "Award title",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "description": {
                       "title": "Description",
                       "description": "Award description",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "status": {
                       "title": "Award status",
                       "description": "The current status of the award drawn from the [awardStatus codelist](http://standard.open-contracting.org/latest/en/schema/codelists/#award-status)",
                       "type": [
                           "string",
                           "null"
                       ],
                       "enum": [
                           "pending",
                           "active",
                           "cancelled",
                           "unsuccessful",
                           null
                       ],
                       "codelist": "awardStatus.csv",
                       "openCodelist": false
                   },
                   "date": {
                       "title": "Award date",
                       "description": "The date of the contract award. This is usually the date on which a decision to award was made.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "format": "date-time"
                   },
                   "value": {
                       "title": "Value",
                       "description": "The total value of this award. In the case of a framework contract this may be the total estimated lifetime value, or maximum value, of the agreement. There may be more than one award per procurement. A negative value indicates that the award may involve payments from the supplier to the buyer (commonly used in concession contracts).",
                       "$ref": "#/definitions/Value"
                   },
                   "suppliers": {
                       "title": "Suppliers",
                       "description": "The suppliers awarded this award. If different suppliers have been awarded different items or values, these should be split into separate award blocks.",
                       "type": "array",
                       "items": {
                           "$ref": "#/definitions/OrganizationReference"
                       },
                       "uniqueItems": true
                   },
                   "items": {
                       "title": "Items awarded",
                       "description": "The goods and services awarded in this award, broken into line items wherever possible. Items should not be duplicated, but the quantity specified instead.",
                       "type": "array",
                       "minItems": 1,
                       "items": {
                           "$ref": "#/definitions/Item"
                       },
                       "uniqueItems": true
                   },
                   "contractPeriod": {
                       "title": "Contract period",
                       "description": "The period for which the contract has been awarded.",
                       "$ref": "#/definitions/Period"
                   },
                   "documents": {
                       "title": "Documents",
                       "description": "All documents and attachments related to the award, including any notices.",
                       "type": "array",
                       "items": {
                           "$ref": "#/definitions/Document"
                       },
                       "uniqueItems": true
                   },
                   "amendments": {
                       "description": "An award amendment is a formal change to the details of the award, and generally involves the publication of a new award notice/release. The rationale and a description of the changes made can be provided here.",
                       "type": "array",
                       "title": "Amendments",
                       "items": {
                           "$ref": "#/definitions/Amendment"
                       }
                   },
                   "amendment": {
                       "title": "Amendment",
                       "description": "The use of individual amendment objects has been deprecated. From OCDS 1.1 information should be provided in the amendments array.",
                       "$ref": "#/definitions/Amendment",
                       "deprecated": {
                           "description": "The single amendment object has been deprecated in favour of including amendments in an amendments (plural) array.",
                           "deprecatedVersion": "1.1"
                       }
                   }
               },
               "patternProperties": {
                   "^(title_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "^(description_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   }
               }
           },
           "Contract": {
               "type": "object",
               "title": "Contract",
               "description": "Information regarding the signed contract between the buyer and supplier(s).",
               "required": [
                   "id",
                   "awardID"
               ],
               "properties": {
                   "id": {
                       "title": "Contract ID",
                       "description": "The identifier for this contract. It must be unique and cannot change within its Open Contracting Process (defined by a single ocid). See the [identifier guidance](http://standard.open-contracting.org/latest/en/schema/identifiers/) for further details.",
                       "type": [
                           "string",
                           "integer"
                       ],
                       "minLength": 1
                   },
                   "awardID": {
                       "title": "Award ID",
                       "description": "The award.id against which this contract is being issued.",
                       "type": [
                           "string",
                           "integer"
                       ],
                       "minLength": 1
                   },
                   "title": {
                       "title": "Contract title",
                       "description": "Contract title",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "description": {
                       "title": "Contract description",
                       "description": "Contract description",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "status": {
                       "title": "Contract status",
                       "description": "The current status of the contract. Drawn from the [contractStatus codelist](http://standard.open-contracting.org/latest/en/schema/codelists/#contract-status)",
                       "type": [
                           "string",
                           "null"
                       ],
                       "enum": [
                           "pending",
                           "active",
                           "cancelled",
                           "terminated",
                           null
                       ],
                       "codelist": "contractStatus.csv",
                       "openCodelist": false
                   },
                   "period": {
                       "title": "Period",
                       "description": "The start and end date for the contract.",
                       "$ref": "#/definitions/Period"
                   },
                   "value": {
                       "title": "Value",
                       "description": "The total value of this contract. A negative value indicates that the contract will involve payments from the supplier to the buyer (commonly used in concession contracts).",
                       "$ref": "#/definitions/Value"
                   },
                   "items": {
                       "title": "Items contracted",
                       "description": "The goods, services, and any intangible outcomes in this contract. Note: If the items are the same as the award do not repeat.",
                       "type": "array",
                       "minItems": 1,
                       "items": {
                           "$ref": "#/definitions/Item"
                       },
                       "uniqueItems": true
                   },
                   "dateSigned": {
                       "title": "Date signed",
                       "description": "The date the contract was signed. In the case of multiple signatures, the date of the last signature.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "format": "date-time"
                   },
                   "documents": {
                       "title": "Documents",
                       "description": "All documents and attachments related to the contract, including any notices.",
                       "type": "array",
                       "items": {
                           "$ref": "#/definitions/Document"
                       },
                       "uniqueItems": true
                   },
                   "implementation": {
                       "title": "Implementation",
                       "description": "Information related to the implementation of the contract in accordance with the obligations laid out therein.",
                       "$ref": "#/definitions/Implementation"
                   },
                   "relatedProcesses": {
                       "uniqueItems": true,
                       "items": {
                           "$ref": "#/definitions/RelatedProcess"
                       },
                       "description": "If this process is followed by one or more contracting processes, represented under a separate open contracting identifier (ocid) then details of the related process can be provided here. This is commonly used to point to subcontracts, or to renewal and replacement processes for this contract.",
                       "title": "Related processes",
                       "type": "array"
                   },
                   "milestones": {
                       "title": "Contract milestones",
                       "description": "A list of milestones associated with the finalization of this contract.",
                       "type": "array",
                       "items": {
                           "$ref": "#/definitions/Milestone"
                       }
                   },
                   "amendments": {
                       "description": "A contract amendment is a formal change to, or extension of, a contract, and generally involves the publication of a new contract notice/release, or some other documents detailing the change. The rationale and a description of the changes made can be provided here.",
                       "type": "array",
                       "title": "Amendments",
                       "items": {
                           "$ref": "#/definitions/Amendment"
                       }
                   },
                   "amendment": {
                       "title": "Amendment",
                       "description": "The use of individual amendment objects has been deprecated. From OCDS 1.1 information should be provided in the amendments array.",
                       "$ref": "#/definitions/Amendment",
                       "deprecated": {
                           "description": "The single amendment object has been deprecated in favour of including amendments in an amendments (plural) array.",
                           "deprecatedVersion": "1.1"
                       }
                   }
               },
               "patternProperties": {
                   "^(title_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "^(description_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   }
               }
           },
           "Implementation": {
               "type": "object",
               "title": "Implementation",
               "description": "Information during the performance / implementation stage of the contract.",
               "properties": {
                   "transactions": {
                       "title": "Transactions",
                       "description": "A list of the spending transactions made against this contract",
                       "type": "array",
                       "items": {
                           "$ref": "#/definitions/Transaction"
                       },
                       "uniqueItems": true
                   },
                   "milestones": {
                       "title": "Milestones",
                       "description": "As milestones are completed, milestone completions should be documented.",
                       "type": "array",
                       "items": {
                           "$ref": "#/definitions/Milestone"
                       },
                       "uniqueItems": true
                   },
                   "documents": {
                       "title": "Documents",
                       "description": "Documents and reports that are part of the implementation phase e.g. audit and evaluation reports.",
                       "type": "array",
                       "items": {
                           "$ref": "#/definitions/Document"
                       },
                       "uniqueItems": true
                   }
               }
           },
           "Milestone": {
               "title": "Milestone",
               "description": "The milestone block can be used to represent a wide variety of events in the lifetime of a contracting process. The milestone type codelist is used to indicate the nature of each milestone.",
               "type": "object",
               "required": [
                   "id"
               ],
               "properties": {
                   "id": {
                       "title": "ID",
                       "description": "A local identifier for this milestone, unique within this block. This field is used to keep track of multiple revisions of a milestone through the compilation from release to record mechanism.",
                       "type": [
                           "string",
                           "integer"
                       ],
                       "minLength": 1
                   },
                   "title": {
                       "title": "Title",
                       "description": "Milestone title",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "type": {
                       "title": "Milestone type",
                       "description": "The type of milestone, drawn from an extended [milestoneType codelist](http://standard.open-contracting.org/latest/en/schema/codelists/#milestone-type).",
                       "type": [
                           "string",
                           "null"
                       ],
                       "codelist": "milestoneType.csv",
                       "openCodelist": true
                   },
                   "description": {
                       "title": "Description",
                       "description": "A description of the milestone.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "code": {
                       "title": "Milestone code",
                       "description": "Milestone codes can be used to track specific events that take place for a particular kind of contracting process. For example, a code of 'approvalLetter' could be used to allow applications to understand this milestone represents the date an approvalLetter is due or signed. Milestone codes is an open codelist, and codes should be agreed among data producers and the applications using that data.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "dueDate": {
                       "title": "Due date",
                       "description": "The date the milestone is due.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "format": "date-time"
                   },
                   "dateMet": {
                       "format": "date-time",
                       "title": "Date met",
                       "description": "The date on which the milestone was met.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "dateModified": {
                       "title": "Date modified",
                       "description": "The date the milestone was last reviewed or modified and the status was altered or confirmed to still be correct.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "format": "date-time"
                   },
                   "status": {
                       "title": "Status",
                       "description": "The status that was realized on the date provided in dateModified, drawn from the [milestoneStatus codelist](http://standard.open-contracting.org/latest/en/schema/codelists/#milestone-status).",
                       "type": [
                           "string",
                           "null"
                       ],
                       "enum": [
                           "scheduled",
                           "met",
                           "notMet",
                           "partiallyMet",
                           null
                       ],
                       "codelist": "milestoneStatus.csv",
                       "openCodelist": false
                   },
                   "documents": {
                       "title": "Documents",
                       "description": "List of documents associated with this milestone (Deprecated in 1.1).",
                       "type": "array",
                       "deprecated": {
                           "deprecatedVersion": "1.1",
                           "description": "Inclusion of documents at the milestone level is now deprecated. Documentation should be attached in the tender, award, contract or implementation sections, and titles and descriptions used to highlight the related milestone. Publishers who wish to continue to provide documents at the milestone level should explicitly declare this by using the milestone documents extension."
                       },
                       "items": {
                           "$ref": "#/definitions/Document"
                       },
                       "uniqueItems": true
                   }
               },
               "patternProperties": {
                   "^(title_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "^(description_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   }
               }
           },
           "Document": {
               "type": "object",
               "title": "Document",
               "description": "Links to, or descriptions of, external documents can be attached at various locations within the standard. Documents may be supporting information, formal notices, downloadable forms, or any other kind of resource that should be made public as part of full open contracting.",
               "required": [
                   "id"
               ],
               "properties": {
                   "id": {
                       "title": "ID",
                       "description": "A local, unique identifier for this document. This field is used to keep track of multiple revisions of a document through the compilation from release to record mechanism.",
                       "type": [
                           "string",
                           "integer"
                       ],
                       "minLength": 1
                   },
                   "documentType": {
                       "title": "Document type",
                       "description": "A classification of the document described taken from the [documentType codelist](http://standard.open-contracting.org/latest/en/schema/codelists/#document-type). Values from the provided codelist should be used wherever possible, though extended values can be provided if the codelist does not have a relevant code.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "codelist": "documentType.csv",
                       "openCodelist": true
                   },
                   "title": {
                       "title": "Title",
                       "description": "The document title.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "description": {
                       "title": "Description",
                       "description": "A short description of the document. We recommend descriptions do not exceed 250 words. In the event the document is not accessible online, the description field can be used to describe arrangements for obtaining a copy of the document.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "url": {
                       "title": "URL",
                       "description": " direct link to the document or attachment. The server providing access to this document should be configured to correctly report the document mime type.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "format": "uri"
                   },
                   "datePublished": {
                       "title": "Date published",
                       "description": "The date on which the document was first published. This is particularly important for legally important documents such as notices of a tender.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "format": "date-time"
                   },
                   "dateModified": {
                       "title": "Date modified",
                       "description": "Date that the document was last modified",
                       "type": [
                           "string",
                           "null"
                       ],
                       "format": "date-time"
                   },
                   "format": {
                       "title": "Format",
                       "description": "The format of the document taken from the [IANA Media Types codelist](http://www.iana.org/assignments/media-types/), with the addition of one extra value for 'offline/print', used when this document entry is being used to describe the offline publication of a document. Use values from the template column. Links to web pages should be tagged 'text/html'.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "language": {
                       "title": "Language",
                       "description": "Specifies the language of the linked document using either two-letter [ISO639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes), or extended [BCP47 language tags](http://www.w3.org/International/articles/language-tags/). The use of lowercase two-letter codes from [ISO639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) is strongly recommended unless there is a clear user need for distinguishing the language subtype.",
                       "type": [
                           "string",
                           "null"
                       ]
                   }
               },
               "patternProperties": {
                   "^(title_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "^(description_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   }
               }
           },
           "Budget": {
               "type": "object",
               "title": "Budget information",
               "description": "This section contain information about the budget line, and associated projects, through which this contracting process is funded. It draws upon data model of the [Fiscal Data Package](http://fiscal.dataprotocols.org/), and should be used to cross-reference to more detailed information held using a Budget Data Package, or, where no linked Budget Data Package is available, to provide enough information to allow a user to manually or automatically cross-reference with another published source of budget and project information.",
               "properties": {
                   "id": {
                       "title": "ID",
                       "description": "An identifier for the budget line item which provides funds for this contracting process. This identifier should be possible to cross-reference against the provided data source.",
                       "type": [
                           "string",
                           "integer",
                           "null"
                       ]
                   },
                   "description": {
                       "title": "Budget Source",
                       "description": "A short free text description of the budget source. May be used to provide the title of the budget line, or the programme used to fund this project.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "amount": {
                       "title": "Amount",
                       "description": "The value reserved in the budget for this contracting process. A negative value indicates anticipated income to the budget as a result of this contracting process, rather than expenditure. Where the budget is drawn from multiple sources, the budget breakdown extension can be used.",
                       "$ref": "#/definitions/Value"
                   },
                   "project": {
                       "title": "Project title",
                       "description": "The name of the project that through which this contracting process is funded (if applicable). Some organizations maintain a registry of projects, and the data should use the name by which the project is known in that registry. No translation option is offered for this string, as translated values can be provided in third-party data, linked from the data source above.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "projectID": {
                       "title": "Project identifier",
                       "description": "An external identifier for the project that this contracting process forms part of, or is funded via (if applicable). Some organizations maintain a registry of projects, and the data should use the identifier from the relevant registry of projects.",
                       "type": [
                           "string",
                           "integer",
                           "null"
                       ]
                   },
                   "uri": {
                       "title": "Linked budget information",
                       "description": "A URI pointing directly to a machine-readable record about the budget line-item or line-items that fund this contracting process. Information may be provided in a range of formats, including using IATI, the Open Fiscal Data Standard or any other standard which provides structured data on budget sources. Human readable documents can be included using the planning.documents block.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "format": "uri"
                   },
                   "source": {
                       "title": "Data Source",
                       "description": "(Deprecated in 1.1) Used to point either to a corresponding Budget Data Package, or to a machine or human-readable source where users can find further information on the budget line item identifiers, or project identifiers, provided here.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "deprecated": {
                           "deprecatedVersion": "1.1",
                           "description": "The budget data source field was intended to link to machine-readable data about the budget for a contracting process, but has been widely mis-used to provide free-text descriptions of budget providers. As a result, it has been removed from version 1.1. budget/uri can be used to provide a link to machine-readable budget information, and budget/description can be used to provide human-readable information on the budget source."
                       },
                       "format": "uri"
                   }
               },
               "patternProperties": {
                   "^(source_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "^(description_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "^(project_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   }
               }
           },
           "Transaction": {
               "type": "object",
               "title": "Transaction information",
               "description": "A spending transaction related to the contracting process. Draws upon the data models of the [Fiscal Data Package](http://fiscal.dataprotocols.org/) and the [International Aid Transparency Initiative](http://iatistandard.org/activity-standard/iati-activities/iati-activity/transaction/) and should be used to cross-reference to more detailed information held using a Fiscal Data Package, IATI file, or to provide enough information to allow a user to manually or automatically cross-reference with some other published source of transactional spending data.",
               "required": [
                   "id"
               ],
               "properties": {
                   "id": {
                       "title": "ID",
                       "description": "A unique identifier for this transaction. This identifier should be possible to cross-reference against the provided data source. For IATI this is the transaction reference.",
                       "type": [
                           "string",
                           "integer"
                       ],
                       "minLength": 1
                   },
                   "source": {
                       "title": "Data source",
                       "description": "Used to point either to a corresponding Fiscal Data Package, IATI file, or machine or human-readable source where users can find further information on the budget line item identifiers, or project identifiers, provided here.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "format": "uri"
                   },
                   "date": {
                       "title": "Date",
                       "description": "The date of the transaction",
                       "type": [
                           "string",
                           "null"
                       ],
                       "format": "date-time"
                   },
                   "value": {
                       "$ref": "#/definitions/Value",
                       "title": "Value",
                       "description": "The value of the transaction."
                   },
                   "payer": {
                       "$ref": "#/definitions/OrganizationReference",
                       "title": "Payer",
                       "description": "An organization reference for the organization from which the funds in this transaction originate."
                   },
                   "payee": {
                       "$ref": "#/definitions/OrganizationReference",
                       "title": "Payee",
                       "description": "An organization reference for the organization which receives the funds in this transaction."
                   },
                   "uri": {
                       "title": "Linked spending information",
                       "description": "A URI pointing directly to a machine-readable record about this spending transaction.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "format": "uri"
                   },
                   "amount": {
                       "title": "Amount",
                       "description": "(Deprecated in 1.1. Use transaction.value instead) The value of the transaction. A negative value indicates a refund or correction.",
                       "$ref": "#/definitions/Value",
                       "deprecated": {
                           "description": "This field has been replaced by the `transaction.value` field for consistency with the use of value and amount elsewhere in the standard.",
                           "deprecatedVersion": "1.1"
                       }
                   },
                   "providerOrganization": {
                       "title": "Provider organization",
                       "description": "(Deprecated in 1.1. Use transaction.payer instead.) The Organization Identifier for the organization from which the funds in this transaction originate. Expressed following the Organizational Identifier standard - consult the documentation and the codelist.",
                       "$ref": "#/definitions/Identifier",
                       "deprecated": {
                           "description": "This field has been replaced by the `transaction.payer` field to resolve ambiguity arising from 'provider' being interpreted as relating to the goods or services procured rather than the flow of funds between the parties.",
                           "deprecatedVersion": "1.1"
                       }
                   },
                   "receiverOrganization": {
                       "title": "Receiver organization",
                       "description": "(Deprecated in 1.1. Use transaction.payee instead). The Organization Identifier for the organization which receives the funds in this transaction. Expressed following the Organizational Identifier standard - consult the documentation and the codelist.",
                       "$ref": "#/definitions/Identifier",
                       "deprecated": {
                           "description": "This field has been replaced by the `transaction.payee` field to resolve ambiguity arising from 'receiver' being interpreted as relating to the goods or services procured rather than the flow of funds between the parties.",
                           "deprecatedVersion": "1.1"
                       }
                   }
               }
           },
           "OrganizationReference": {
               "properties": {
                   "name": {
                       "type": [
                           "string",
                           "null"
                       ],
                       "description": "The name of the party being referenced. This must match the name of an entry in the parties section.",
                       "title": "Organization name",
                       "minLength": 1
                   },
                   "id": {
                       "type": [
                           "string",
                           "integer"
                       ],
                       "description": "The id of the party being referenced. This must match the id of an entry in the parties section.",
                       "title": "Organization ID"
                   },
                   "identifier": {
                       "title": "Primary identifier",
                       "description": "The primary identifier for this organization. Identifiers that uniquely pick out a legal entity should be preferred. Consult the [organization identifier guidance](http://standard.open-contracting.org/latest/en/schema/identifiers/) for the preferred scheme and identifier to use.",
                       "deprecated": {
                           "deprecatedVersion": "1.1",
                           "description": "From version 1.1, organizations should be referenced by their identifier and name in a document, and detailed legal identifier information should only be provided in the relevant cross-referenced entry in the parties section at the top level of a release."
                       },
                       "$ref": "#/definitions/Identifier"
                   },
                   "address": {
                       "deprecated": {
                           "deprecatedVersion": "1.1",
                           "description": "From version 1.1, organizations should be referenced by their identifier and name in a document, and address information should only be provided in the relevant cross-referenced entry in the parties section at the top level of a release."
                       },
                       "$ref": "#/definitions/Address",
                       "description": "(Deprecated outside the parties section)",
                       "title": "Address"
                   },
                   "additionalIdentifiers": {
                       "type": "array",
                       "deprecated": {
                           "deprecatedVersion": "1.1",
                           "description": "From version 1.1, organizations should be referenced by their identifier and name in a document, and additional identifiers for an organization should be provided in the relevant cross-referenced entry in the parties section at the top level of a release."
                       },
                       "items": {
                           "$ref": "#/definitions/Identifier"
                       },
                       "title": "Additional identifiers",
                       "uniqueItems": true,
                       "wholeListMerge": true,
                       "description": "(Deprecated outside the parties section) A list of additional / supplemental identifiers for the organization, using the [organization identifier guidance](http://standard.open-contracting.org/latest/en/schema/identifiers/). This could be used to provide an internally used identifier for this organization in addition to the primary legal entity identifier."
                   },
                   "contactPoint": {
                       "deprecated": {
                           "deprecatedVersion": "1.1",
                           "description": "From version 1.1, organizations should be referenced by their identifier and name in a document, and contact point information for an organization should be provided in the relevant cross-referenced entry in the parties section at the top level of a release."
                       },
                       "$ref": "#/definitions/ContactPoint",
                       "description": "(Deprecated outside the parties section)",
                       "title": "Contact point"
                   }
               },
               "type": "object",
               "description": "The id and name of the party being referenced. Used to cross-reference to the parties section",
               "title": "Organization reference"
           },
           "Organization": {
               "title": "Organization",
               "description": "A party (organization)",
               "type": "object",
               "properties": {
                   "name": {
                       "title": "Common name",
                       "description": "A common name for this organization or other participant in the contracting process. The identifier object provides an space for the formal legal name, and so this may either repeat that value, or could provide the common name by which this organization or entity is known. This field may also include details of the department or sub-unit involved in this contracting process.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "id": {
                       "type": [
                           "string"
                       ],
                       "description": "The ID used for cross-referencing to this party from other sections of the release. This field may be built with the following structure {identifier.scheme}-{identifier.id}(-{department-identifier}).",
                       "title": "Entity ID"
                   },
                   "identifier": {
                       "title": "Primary identifier",
                       "description": "The primary identifier for this organization or participant. Identifiers that uniquely pick out a legal entity should be preferred. Consult the [organization identifier guidance](http://standard.open-contracting.org/latest/en/schema/identifiers/) for the preferred scheme and identifier to use.",
                       "$ref": "#/definitions/Identifier"
                   },
                   "additionalIdentifiers": {
                       "title": "Additional identifiers",
                       "description": "A list of additional / supplemental identifiers for the organization or participant, using the [organization identifier guidance](http://standard.open-contracting.org/latest/en/schema/identifiers/). This could be used to provide an internally used identifier for this organization in addition to the primary legal entity identifier.",
                       "type": "array",
                       "items": {
                           "$ref": "#/definitions/Identifier"
                       },
                       "uniqueItems": true,
                       "wholeListMerge": true
                   },
                   "address": {
                       "title": "Address",
                       "description": "An address. This may be the legally registered address of the organization, or may be a correspondence address for this particular contracting process.",
                       "$ref": "#/definitions/Address"
                   },
                   "contactPoint": {
                       "title": "Contact point",
                       "description": "Contact details that can be used for this party.",
                       "$ref": "#/definitions/ContactPoint"
                   },
                   "roles": {
                       "title": "Party roles",
                       "description": "The party's role(s) in the contracting process. Role(s) should be taken from the [partyRole codelist](http://standard.open-contracting.org/latest/en/schema/codelists/#party-role). Values from the provided codelist should be used wherever possible, though extended values can be provided if the codelist does not have a relevant code.",
                       "type": [
                           "array",
                           "null"
                       ],
                       "items": {
                           "type": "string"
                       },
                       "codelist": "partyRole.csv",
                       "openCodelist": true
                   },
                   "details": {
                       "type": [
                           "object",
                           "null"
                       ],
                       "description": "Additional classification information about parties can be provided using partyDetail extensions that define particular properties and classification schemes. ",
                       "title": "Details"
                   }
               },
               "patternProperties": {
                   "^(name_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   }
               }
           },
           "Item": {
               "title": "Item",
               "type": "object",
               "description": "A good, service, or work to be contracted.",
               "required": [
                   "id"
               ],
               "properties": {
                   "id": {
                       "title": "ID",
                       "description": "A local identifier to reference and merge the items by. Must be unique within a given array of items.",
                       "type": [
                           "string",
                           "integer"
                       ],
                       "minLength": 1
                   },
                   "description": {
                       "title": "Description",
                       "description": "A description of the goods, services to be provided.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "classification": {
                       "title": "Classification",
                       "description": "The primary classification for the item. See the [itemClassificationScheme](http://standard.open-contracting.org/latest/en/schema/codelists/#item-classification-scheme) to identify preferred classification lists, including CPV and GSIN.",
                       "$ref": "#/definitions/Classification"
                   },
                   "additionalClassifications": {
                       "title": "Additional classifications",
                       "description": "An array of additional classifications for the item. See the [itemClassificationScheme](http://standard.open-contracting.org/latest/en/schema/codelists/#item-classification-scheme) codelist for common options to use in OCDS. This may also be used to present codes from an internal classification scheme.",
                       "type": "array",
                       "items": {
                           "$ref": "#/definitions/Classification"
                       },
                       "uniqueItems": true,
                       "wholeListMerge": true
                   },
                   "quantity": {
                       "title": "Quantity",
                       "description": "The number of units required",
                       "type": [
                           "number",
                           "null"
                       ]
                   },
                   "unit": {
                       "title": "Unit",
                       "description": "A description of the unit in which the supplies, services or works are provided (e.g. hours, kilograms) and the unit-price. For comparability, an established list of units can be used.  ",
                       "type": [
                           "object",
                           "null"
                       ],
                       "properties": {
                           "scheme": {
                               "title": "Scheme",
                               "description": "The list from which units of measure identifiers are taken. This should be an entry from the options available in the [unitClassificationScheme](http://standard.open-contracting.org/latest/en/schema/codelists/#unit-classification-scheme) codelist. Use of the scheme 'UNCEFACT' for the UN/CEFACT Recommendation 20 list of 'Codes for Units of Measure Used in International Trade' is recommended, although other options are available.",
                               "type": [
                                   "string",
                                   "null"
                               ],
                               "codelist": "unitClassificationScheme.csv",
                               "openCodelist": true
                           },
                           "id": {
                               "title": "ID",
                               "description": "The identifier from the codelist referenced in the scheme property. Check the codelist for details of how to find and use identifiers from the scheme in use.",
                               "type": [
                                   "string",
                                   "null"
                               ],
                               "versionId": true
                           },
                           "name": {
                               "title": "Name",
                               "description": "Name of the unit.",
                               "type": [
                                   "string",
                                   "null"
                               ]
                           },
                           "value": {
                               "title": "Value",
                               "description": "The monetary value of a single unit.",
                               "$ref": "#/definitions/Value"
                           },
                           "uri": {
                               "title": "URI",
                               "description": "If the scheme used provide a machine-readable URI for this unit of measure, this can be given.",
                               "format": "uri",
                               "type": [
                                   "string",
                                   "null"
                               ]
                           }
                       },
                       "patternProperties": {
                           "^(name_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                               "type": [
                                   "string",
                                   "null"
                               ]
                           }
                       }
                   }
               },
               "patternProperties": {
                   "^(description_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   }
               }
           },
           "Amendment": {
               "title": "Amendment",
               "type": "object",
               "description": "Amendment information",
               "properties": {
                   "date": {
                       "title": "Amendment date",
                       "description": "The date of this amendment.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "format": "date-time"
                   },
                   "rationale": {
                       "title": "Rationale",
                       "description": "An explanation for the amendment.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "id": {
                       "description": "An identifier for this amendment: often the amendment number",
                       "type": [
                           "string",
                           "null"
                       ],
                       "title": "ID"
                   },
                   "description": {
                       "description": "A free text, or semi-structured, description of the changes made in this amendment.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "title": "Description"
                   },
                   "amendsReleaseID": {
                       "description": "Provide the identifier (release.id) of the OCDS release (from this contracting process) that provides the values for this contracting process **before** the amendment was made.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "title": "Amended release (identifier)"
                   },
                   "releaseID": {
                       "description": "Provide the identifier (release.id) of the OCDS release (from this contracting process) that provides the values for this contracting process **after** the amendment was made.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "title": "Amending release (identifier)"
                   },
                   "changes": {
                       "title": "Amended fields",
                       "description": "An array change objects describing the fields changed, and their former values. (Deprecated in 1.1)",
                       "type": "array",
                       "items": {
                           "type": "object",
                           "properties": {
                               "property": {
                                   "title": "Property",
                                   "description": "The property name that has been changed relative to the place the amendment is. For example if the contract value has changed, then the property under changes within the contract.amendment would be value.amount. (Deprecated in 1.1)",
                                   "type": "string"
                               },
                               "former_value": {
                                   "title": "Former Value",
                                   "description": "The previous value of the changed property, in whatever type the property is. (Deprecated in 1.1)",
                                   "type": [
                                       "string",
                                       "number",
                                       "integer",
                                       "array",
                                       "object",
                                       "null"
                                   ]
                               }
                           }
                       },
                       "deprecated": {
                           "description": "A free-text or semi-structured string describing the changes made in each amendment can be provided in the amendment.description field. To provide structured information on the fields that have changed, publishers should provide releases indicating the state of the contracting process before and after the amendment.  ",
                           "deprecatedVersion": "1.1"
                       }
                   }
               },
               "patternProperties": {
                   "^(rationale_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   }
               }
           },
           "Classification": {
               "title": "Classification",
               "description": "A classification consists of at least two parts: an identifier for the list (scheme) from which the classification is drawn, and an identifier for the category from that list being applied. It is useful to also publish a text label and/or URI that users can draw on to interpret the classification.",
               "type": "object",
               "properties": {
                   "scheme": {
                       "title": "Scheme",
                       "description": "An classification should be drawn from an existing scheme or list of codes. This field is used to indicate the scheme/codelist from which the classification is drawn. For line item classifications, this value should represent an known [Item Classification Scheme](http://standard.open-contracting.org/latest/en/schema/codelists/#item-classification-scheme) wherever possible.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "codelist": "itemClassificationScheme.csv",
                       "openCodelist": true
                   },
                   "id": {
                       "title": "ID",
                       "description": "The classification code drawn from the selected scheme.",
                       "type": [
                           "string",
                           "integer",
                           "null"
                       ]
                   },
                   "description": {
                       "title": "Description",
                       "description": "A textual description or title for the code.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "uri": {
                       "title": "URI",
                       "description": "A URI to identify the code. In the event individual URIs are not available for items in the identifier scheme this value should be left blank.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "format": "uri"
                   }
               },
               "patternProperties": {
                   "^(description_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   }
               }
           },
           "Identifier": {
               "title": "Identifier",
               "description": "A unique identifier for a party (organization).",
               "type": "object",
               "properties": {
                   "scheme": {
                       "title": "Scheme",
                       "description": "Organization identifiers should be drawn from an existing organization identifier list. The scheme field is used to indicate the list or register from which the identifier is drawn. This value should be drawn from the [Organization Identifier Scheme](http://standard.open-contracting.org/latest/en/schema/codelists/#organization-identifier-scheme) codelist.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "id": {
                       "title": "ID",
                       "description": "The identifier of the organization in the selected scheme.",
                       "type": [
                           "string",
                           "integer",
                           "null"
                       ]
                   },
                   "legalName": {
                       "title": "Legal Name",
                       "description": "The legally registered name of the organization.",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "uri": {
                       "title": "URI",
                       "description": "A URI to identify the organization, such as those provided by [Open Corporates](http://www.opencorporates.com) or some other relevant URI provider. This is not for listing the website of the organization: that can be done through the URL field of the Organization contact point.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "format": "uri"
                   }
               },
               "patternProperties": {
                   "^(legalName_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   }
               }
           },
           "Address": {
               "title": "Address",
               "description": "An address.",
               "type": "object",
               "properties": {
                   "streetAddress": {
                       "title": "Street address",
                       "type": [
                           "string",
                           "null"
                       ],
                       "description": "The street address. For example, 1600 Amphitheatre Pkwy."
                   },
                   "locality": {
                       "title": "Locality",
                       "type": [
                           "string",
                           "null"
                       ],
                       "description": "The locality. For example, Mountain View."
                   },
                   "region": {
                       "title": "Region",
                       "type": [
                           "string",
                           "null"
                       ],
                       "description": "The region. For example, CA."
                   },
                   "postalCode": {
                       "title": "Postal code",
                       "type": [
                           "string",
                           "null"
                       ],
                       "description": "The postal code. For example, 94043."
                   },
                   "countryName": {
                       "title": "Country name",
                       "type": [
                           "string",
                           "null"
                       ],
                       "description": "The country name. For example, United States."
                   }
               },
               "patternProperties": {
                   "^(countryName_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   }
               }
           },
           "ContactPoint": {
               "title": "Contact point",
               "type": "object",
               "description": "An person, contact point or department to contact in relation to this contracting process.",
               "properties": {
                   "name": {
                       "title": "Name",
                       "type": [
                           "string",
                           "null"
                       ],
                       "description": "The name of the contact person, department, or contact point, for correspondence relating to this contracting process."
                   },
                   "email": {
                       "title": "Email",
                       "type": [
                           "string",
                           "null"
                       ],
                       "description": "The e-mail address of the contact point/person."
                   },
                   "telephone": {
                       "title": "Telephone",
                       "type": [
                           "string",
                           "null"
                       ],
                       "description": "The telephone number of the contact point/person. This should include the international dialing code."
                   },
                   "faxNumber": {
                       "title": "Fax number",
                       "type": [
                           "string",
                           "null"
                       ],
                       "description": "The fax number of the contact point/person. This should include the international dialing code."
                   },
                   "url": {
                       "title": "URL",
                       "type": [
                           "string",
                           "null"
                       ],
                       "description": "A web address for the contact point/person.",
                       "format": "uri"
                   }
               },
               "patternProperties": {
                   "^(name_(((([A-Za-z]{2,3}(-([A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-([A-Za-z]{4}))?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-([0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(x(-[A-Za-z0-9]{1,8})+))?)|(x(-[A-Za-z0-9]{1,8})+)))$": {
                       "type": [
                           "string",
                           "null"
                       ]
                   }
               }
           },
           "Value": {
               "title": "Value",
               "description": "Financial values should always be published with a currency attached.",
               "type": "object",
               "properties": {
                   "amount": {
                       "title": "Amount",
                       "description": "Amount as a number.",
                       "type": [
                           "number",
                           "null"
                       ]
                   },
                   "currency": {
                       "title": "Currency",
                       "description": "The currency for each amount should always be specified using the uppercase 3-letter currency code from ISO4217.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "codelist": "currency.csv",
                       "openCodelist": false,
                       "enum": [
                           "ADP",
                           "AED",
                           "AFA",
                           "AFN",
                           "ALK",
                           "ALL",
                           "AMD",
                           "ANG",
                           "AOA",
                           "AOK",
                           "AON",
                           "AOR",
                           "ARA",
                           "ARP",
                           "ARS",
                           "ARY",
                           "ATS",
                           "AUD",
                           "AWG",
                           "AYM",
                           "AZM",
                           "AZN",
                           "BAD",
                           "BAM",
                           "BBD",
                           "BDT",
                           "BEC",
                           "BEF",
                           "BEL",
                           "BGJ",
                           "BGK",
                           "BGL",
                           "BGN",
                           "BHD",
                           "BIF",
                           "BMD",
                           "BND",
                           "BOB",
                           "BOP",
                           "BOV",
                           "BRB",
                           "BRC",
                           "BRE",
                           "BRL",
                           "BRN",
                           "BRR",
                           "BSD",
                           "BTN",
                           "BUK",
                           "BWP",
                           "BYB",
                           "BYN",
                           "BYR",
                           "BZD",
                           "CAD",
                           "CDF",
                           "CHC",
                           "CHE",
                           "CHF",
                           "CHW",
                           "CLF",
                           "CLP",
                           "CNY",
                           "COP",
                           "COU",
                           "CRC",
                           "CSD",
                           "CSJ",
                           "CSK",
                           "CUC",
                           "CUP",
                           "CVE",
                           "CYP",
                           "CZK",
                           "DDM",
                           "DEM",
                           "DJF",
                           "DKK",
                           "DOP",
                           "DZD",
                           "ECS",
                           "ECV",
                           "EEK",
                           "EGP",
                           "ERN",
                           "ESA",
                           "ESB",
                           "ESP",
                           "ETB",
                           "EUR",
                           "FIM",
                           "FJD",
                           "FKP",
                           "FRF",
                           "GBP",
                           "GEK",
                           "GEL",
                           "GHC",
                           "GHP",
                           "GHS",
                           "GIP",
                           "GMD",
                           "GNE",
                           "GNF",
                           "GNS",
                           "GQE",
                           "GRD",
                           "GTQ",
                           "GWE",
                           "GWP",
                           "GYD",
                           "HKD",
                           "HNL",
                           "HRD",
                           "HRK",
                           "HTG",
                           "HUF",
                           "IDR",
                           "IEP",
                           "ILP",
                           "ILR",
                           "ILS",
                           "INR",
                           "IQD",
                           "IRR",
                           "ISJ",
                           "ISK",
                           "ITL",
                           "JMD",
                           "JOD",
                           "JPY",
                           "KES",
                           "KGS",
                           "KHR",
                           "KMF",
                           "KPW",
                           "KRW",
                           "KWD",
                           "KYD",
                           "KZT",
                           "LAJ",
                           "LAK",
                           "LBP",
                           "LKR",
                           "LRD",
                           "LSL",
                           "LSM",
                           "LTL",
                           "LTT",
                           "LUC",
                           "LUF",
                           "LUL",
                           "LVL",
                           "LVR",
                           "LYD",
                           "MAD",
                           "MDL",
                           "MGA",
                           "MGF",
                           "MKD",
                           "MLF",
                           "MMK",
                           "MNT",
                           "MOP",
                           "MRO",
                           "MRU",
                           "MTL",
                           "MTP",
                           "MUR",
                           "MVQ",
                           "MVR",
                           "MWK",
                           "MXN",
                           "MXP",
                           "MXV",
                           "MYR",
                           "MZE",
                           "MZM",
                           "MZN",
                           "NAD",
                           "NGN",
                           "NIC",
                           "NIO",
                           "NLG",
                           "NOK",
                           "NPR",
                           "NZD",
                           "OMR",
                           "PAB",
                           "PEH",
                           "PEI",
                           "PEN",
                           "PES",
                           "PGK",
                           "PHP",
                           "PKR",
                           "PLN",
                           "PLZ",
                           "PTE",
                           "PYG",
                           "QAR",
                           "RHD",
                           "ROK",
                           "ROL",
                           "RON",
                           "RSD",
                           "RUB",
                           "RUR",
                           "RWF",
                           "SAR",
                           "SBD",
                           "SCR",
                           "SDD",
                           "SDG",
                           "SDP",
                           "SEK",
                           "SGD",
                           "SHP",
                           "SIT",
                           "SKK",
                           "SLL",
                           "SOS",
                           "SRD",
                           "SRG",
                           "SSP",
                           "STD",
                           "STN",
                           "SUR",
                           "SVC",
                           "SYP",
                           "SZL",
                           "THB",
                           "TJR",
                           "TJS",
                           "TMM",
                           "TMT",
                           "TND",
                           "TOP",
                           "TPE",
                           "TRL",
                           "TRY",
                           "TTD",
                           "TWD",
                           "TZS",
                           "UAH",
                           "UAK",
                           "UGS",
                           "UGW",
                           "UGX",
                           "USD",
                           "USN",
                           "USS",
                           "UYI",
                           "UYN",
                           "UYP",
                           "UYU",
                           "UZS",
                           "VEB",
                           "VEF",
                           "VNC",
                           "VND",
                           "VUV",
                           "WST",
                           "XAF",
                           "XAG",
                           "XAU",
                           "XBA",
                           "XBB",
                           "XBC",
                           "XBD",
                           "XCD",
                           "XDR",
                           "XEU",
                           "XFO",
                           "XFU",
                           "XOF",
                           "XPD",
                           "XPF",
                           "XPT",
                           "XRE",
                           "XSU",
                           "XTS",
                           "XUA",
                           "XXX",
                           "YDD",
                           "YER",
                           "YUD",
                           "YUM",
                           "YUN",
                           "ZAL",
                           "ZAR",
                           "ZMK",
                           "ZMW",
                           "ZRN",
                           "ZRZ",
                           "ZWC",
                           "ZWD",
                           "ZWL",
                           "ZWN",
                           "ZWR",
                           null
                       ]
                   }
               }
           },
           "Period": {
               "title": "Period",
               "description": "Key events during a contracting process may have a known start date, end date, duration, or maximum extent (the latest date the period can extend to). In some cases, not all of these fields will have known or relevant values.",
               "type": "object",
               "properties": {
                   "startDate": {
                       "title": "Start date",
                       "description": "The start date for the period. When known, a precise start date must always be provided.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "format": "date-time"
                   },
                   "endDate": {
                       "title": "End date",
                       "description": "The end date for the period. When known, a precise end date must always be provided.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "format": "date-time"
                   },
                   "maxExtentDate": {
                       "description": "The period cannot be extended beyond this date. This field is optional, and can be used to express the maximum available data for extension or renewal of this period.",
                       "format": "date-time",
                       "title": "Maximum extent",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "durationInDays": {
                       "description": "The maximum duration of this period in days. A user interface may wish to collect or display this data in months or years as appropriate, but should convert it into days when completing this field. This field can be used when exact dates are not known.  Where a startDate and endDate are given, this field is optional, and should reflect the difference between those two days. Where a startDate and maxExtentDate are given, this field is optional, and should reflect the difference between startDate and maxExtentDate.",
                       "title": "Duration (days)",
                       "type": [
                           "integer",
                           "null"
                       ]
                   }
               }
           },
           "RelatedProcess": {
               "description": "A reference to a related contracting process: generally one preceding or following on from the current process.",
               "type": "object",
               "title": "Related Process",
               "properties": {
                   "id": {
                       "title": "Relationship ID",
                       "description": "A local identifier for this relationship, unique within this array.",
                       "type": [
                           "string"
                       ]
                   },
                   "relationship": {
                       "items": {
                           "type": "string"
                       },
                       "description": "Specify the type of relationship using the [related process codelist](http://standard.open-contracting.org/latest/en/schema/codelists/#related-process).",
                       "title": "Relationship",
                       "type": [
                           "array",
                           "null"
                       ],
                       "codelist": "relatedProcess.csv",
                       "openCodelist": true
                   },
                   "title": {
                       "description": "The title of the related process, where referencing an open contracting process, this field should match the tender/title field in the related process.",
                       "title": "Related process title",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "scheme": {
                       "title": "Scheme",
                       "description": "The identification scheme used by this cross-reference from the [related process scheme codelist](http://standard.open-contracting.org/latest/en/schema/codelists/#related-process-scheme) codelist. When cross-referencing information also published using OCDS, an Open Contracting ID (ocid) should be used.",
                       "type": [
                           "string",
                           "null"
                       ],
                       "codelist": "relatedProcessScheme.csv",
                       "openCodelist": true
                   },
                   "identifier": {
                       "description": "The identifier of the related process. When cross-referencing information also published using OCDS, this should be the Open Contracting ID (ocid).",
                       "title": "Identifier",
                       "type": [
                           "string",
                           "null"
                       ]
                   },
                   "uri": {
                       "format": "uri",
                       "description": "A URI pointing to a machine-readable document, release or record package containing the identified related process.",
                       "title": "Related process URI",
                       "type": [
                           "string",
                           "null"
                       ]
                   }
               }
           }
       }

   }

source (desactualizado)
-----------------------

::

   {
   importador
   descripción_fuente
   source_run - array: fecha, numero registros, numero errores, descripcion de errores, status, id
   url_origen
   coleccion
   }

summaries
---------

Cuando se solicita un sólo elemento de persons, companies o
institutions, este incluirán sus summaries, que es un resúmen de los
contratos. Estos incluyen: \* Resúmen de contratos por año de
contratación y rol, desglosando importe y cantidad. \* Resúmen de
contratos por tipo de contratación y rol, desglosando importe y
cantidad. \* Resúmen de relaciones, que se compone de un listado de
nodos y otro de enlaces para poder construir un grafo de relaciones \*
Resúmen de los tres compradores más grandes por importe de contratación
\* Resúmen de los tres proveedores más grandes por importe de
contratación \* Los tres contratos más grandes por cada rol \* Resúmen
de los tres contratos más grandes por cada rol

Los roles son: funder (financiador), supplier (proveedor), buyer
(comprador).

Ejemplo:

::

   summaries": {

       //Resúmen de contratos por año de contratación y rol, desglosando importe y cantidad.
       "year": {
           "2009": {
               "buyer": {
                   "value": 0,
                   "count": 0
               },
               "supplier": {
                   "value": 2023983,
                   "count": 2
               },
               "funder": {
                   "value": 0,
                   "count": 0
               }
           },
       },
       //Resúmen de contratos por tipo de contratación y rol, desglosando importe y cantidad.
       "type": {
           "open": {
               "buyer": {
                   "value": 0,
                   "count": 0
               },
               "supplier": {
                   "value": 14780278,
                   "count": 11
               },
               "funder": {
                   "value": 0,
                   "count": 0
               }
           },
           "limited": {
               "buyer": {
                   "value": 0,
                   "count": 0
               },
               "supplier": {
                   "value": 4139566,
                   "count": 3
               },
               "funder": {
                   "value": 0,
                   "count": 0
               }
           },
           "direct": {
               "buyer": {
                   "value": 0,
                   "count": 0
               },
               "supplier": {
                   "value": 230339,
                   "count": 1
               },
               "funder": {
                   "value": 0,
                   "count": 0
               }
           }
       },
       //El resúmen de relaciones se compone de un listado de nodos y otro de enlaces para poder construir un grafo de relaciones
       "relation": {
           //Nodos para un grafo de relaciones
           "nodes": [
               {
                   "id": "direccion-general-de-conservacion-de-carreteras-secretaria-de-comunicaciones-y-transportes",
                   "label": "Dirección General de Conservación de Carreteras",
                   "type": "institution",
                   "weight": 35
               },
           ],
           //Enlaces entre nodos
           "links": [
               {
                   "id": 0,
                   "source": "direccion-general-de-conservacion-de-carreteras-secretaria-de-comunicaciones-y-transportes",
                   "target": "internacional-de-auditorias-y-consultorias-tecnicas-s-s-de-rl",
                   "weight": 1,
                   "type": "open"
               },
           ]
       },
       // Resúmen de los tres compradores más grandes por importe de contratación
       "top_buyers": [
           //Aquí se incluyen tres "parties" de OCDS Records si esta entidad hizo contratos como proveedor
           // Ejemplo:
           {
               "roles": [
                   "buyer"
               ],
               "id": "direccion-general-de-conservacion-de-carreteras-secretaria-de-comunicaciones-y-transportes",
               "name": "Dirección General de Conservación de Carreteras",
               "address": {
                   "countryName": "Mexico"
               },
               "memberOf": [
                   {
                       "name": "SECRETARÍA DE COMUNICACIONES Y TRANSPORTES",
                       "id": "secretaria-de-comunicaciones-y-transportes"
                   }
               ],
               "identifier": {
                   "scheme": "MX-CPA",
                   "id": "9002",
                   "legalName": "Dirección General de Conservación de Carreteras",
                   "uri": "https://sites.google.com/site/cnetuc/directorio"
               },
               "details": {
                   "type": "institution"
               },
               "contract_amount_top_buyer": 9307597.55
           }
       ],
       // Resúmen de los tres proveedores más grandes por importe de contratación
       "top_suppliers": [
       //Aquí se incluyen tres "parties" de OCDS Records si esta entidad hizo contratos como comprador
       ],
       "top_fundees": [
       //Aquí se incluyen tres "parties" de OCDS Records si esta entidad hizo contratos como financiador
       ]

   },
   //Resúmen de los tres contratos más grandes por cada rol
   "top3contracts": {

       "funder": [
       //Aquí se incluyen tres OCDS Records si esta entidad hizo contratos como financiador
       ],
       "buyer": [
       //Aquí se incluyen tres OCDS Records si esta entidad hizo contratos como comprador
       ],
       "supplier": [
         //Aquí se incluyen tres OCDS Records si esta entidad hizo contratos como proveedor
       ]

party_flags
-----------

Para cada institution y person, si se solicita una sola y con embed en
true se devuelve sus flags, es decir, el resultado de la aplicación de
las banderas OCDS del sistema Groucho, para detalles sobre la
metodología revisar
`TodosLosContratos.mx <https://www.todosloscontratos.mx/#metodologia>`__.

Estas incluyen: \* Información sobre la entidad evaluada \* Puntajes de
las banderas de contrato agregadas por categoría \* Resúmen de puntajes
de las banderas de contrato para esta entidad. Para saber qué evaluación
se aplica en cada regla puede revisar el archivo donde se especifican
las reglas en OCDS_RedFlags
`flagsMX.json <https://github.com/ProjectPODER/OCDS_RedFlags/blob/master/flagsMX.json>`__
\* Resúmen de puntajes de las banderas de contrato para esta entidad por
cada año \* Resúmen de puntajes de las banderas de nodo para esta
entidad \* Resúmen de puntajes de las banderas de nodo agregadas por
categoría \* Resúmen de puntajes de las categorías de nodo y de contrato
agregadas por categoría \* Puntaje total, promedio de node y contract
categories

Ejemplo:

::

   flags": [

       {
           "_id": "13bd42c06e4bf5229b870901323d0bfa493e587d",
           //Información sobre la entidad evaluada
           "party": {
               "id": "banco-interamericano-de-desarrollo",
               "type": "supplier"
           },
           //Puntajes de las banderas de contrato agregadas por categoría
           "contract_categories": {
               "total_score": 0.708688222522045,
               "trans": 0.4838571823253367,
               "temp": 0.7107533108103375,
               "comp": 0.9729379795396419,
               "traz": 0.6672044174128638
           },
           //Resúmen de puntajes de las banderas de contrato para esta entidad
           "contract_rules": {
               "trans-ov": 0,
               "trans-sc": 0.9999433876811594,
               "trans-ccm": 0.7498177043807246,
               "trans-cc": 0.18566763723946264,
               "temp-cft": 0.3483126759593723,
               "temp-tipo": 0.6018280004618168,
               "temp-dl": 0.9919503389330976,
               "temp-fs": 0.9009222278870633,
               "comp-cfc": 0.9458759590792839,
               "comp-pf": 1,
               "traz-ei": 0.5143459501905567,
               "traz-cft": 0,
               "traz-mc": 0.9831310659715391,
               "traz-ip": 0,
               "traz-pf": 1,
               "traz-ir": 0.9885163669914354,
               "traz-ct": 0.8519816300624237,
               "traz-fro": 0.9996603260869565
           },
           //Resúmen de puntajes de las banderas de contrato para esta entidad por cada año
           "years": [
               {
                   "year": "2016",
                   "contract_score": {
                       "total_score": 0.7264003134327688,
                       "trans": 0.4918784276441186,
                       "temp": 0.8736413043478264,
                       "comp": 0.8967391304347827,
                       "traz": 0.6433423913043479
                   },
                   "contract_rules": {
                       "trans-ov": 0,
                       "trans-sc": 0.9995471014492755,
                       "trans-ccm": 0.7755084151472668,
                       "trans-cc": 0.19245819397993222,
                       "temp-cft": 0.8695652173913045,
                       "temp-tipo": 0.6277173913043484,
                       "temp-dl": 1,
                       "temp-fs": 0.9972826086956522,
                       "comp-cfc": 0.7934782608695654,
                       "comp-pf": 1,
                       "traz-ei": 0.49184782608695654,
                       "traz-cft": 0,
                       "traz-mc": 0.9619565217391305,
                       "traz-ip": 0,
                       "traz-pf": 1,
                       "traz-ir": 1,
                       "traz-ct": 0.6956521739130435,
                       "traz-fro": 0.9972826086956522
                   },
                   "node_rules": {
                       "conf": 0.0026422839545957796,
                       "aepm": {
                           "score": 1
                       },
                       "aepc": {
                           "score": 1
                       },
                       "tcr10": {
                           "score": 1
                       },
                       "mcr10": {
                           "score": 1
                       },
                       "celp": {
                           "score": 1
                       },
                       "rla": {
                           "score": 1
                       },
                       "ncap3": {
                           "date": "08-12",
                           "value": 0.07588075880758807,
                           "score": 0
                       },
                       "total_score": 0.7503302854943245
                   }
               },
           ],
           //Resúmen de puntajes de las banderas de nodo para esta entidad
           "node_rules": {
               "conf": 0.673441838691284,
               "aepm": 1,
               "aepc": 1,
               "tcr10": 0.625,
               "mcr10": 0.875,
               "celp": 1,
               "rla": 1,
               "ncap3": 0
           },
           //Resúmen de puntajes de las banderas de nodo agregadas por categoría
           "node_categories": {
               "comp": 0.8,
               "traz": 0.75,
               "total_score": 0.775
           },
           //Resúmen de puntajes de las categorías de nodo y de contrato agregadas por categoría
           "category_score": {
               "comp": 0.886468989769821,
               "traz": 0.7086022087064319
           },
           //Puntaje total, promedio de node y contract categories
           "total_score": 0.7418441112610226
       }

   ]

contract_flags
--------------

Para cada contract, si se solicita uno sola y con embed en true se
devuelve sus flags, es decir, el resultado de la aplicación de las
banderas OCDS del sistema Groucho, para detalles sobre la metodología
revisar
`TodosLosContratos.mx <https://www.todosloscontratos.mx/#metodologia>`__.

-  Información del contrato.
-  Puntajes agregados por categoría.
-  Puntajes de cada evaluación en este contrato en grupos por categoría.
   Para saber qué evaluación se aplica en cada regla puede revisar el
   archivo donde se especifican las reglas en OCDS_RedFlags
   `flagsMX.json <https://github.com/ProjectPODER/OCDS_RedFlags/blob/master/flagsMX.json>`__

Ejemplo:

::

   "flags": [

       {
           "_id": "05373fc128e6d4fab25e25849f7a64ce44d88765",
           //Información del contrato
           "id": "030/2009",
           "ocid": "ocds-0ud2q6-44936001-007-09",
           "date_signed": "2009-01-04T00:00:00.000Z",
           "parties": [
               {
                   "id": "secretaria-de-finanzas-planeacion-y-administracion-del-estado-de-mexico",
                   "entity": "dependency"
               },
               {
                   "id": "coordinacion-administrativa-secretaria-de-finanzas-planeacion-y-administracion-del-estado-de-mexico",
                   "entity": "buyer",
                   "parent": {
                       "id": "secretaria-de-finanzas-planeacion-y-administracion-del-estado-de-mexico"
                   }
               },
               {
                   "id": "impresora-silvaform-sa-de-cv",
                   "entity": "supplier"
               }
           ],
           "value": {
               "amount": 138945760000,
               "currency": "MXN"
           },
           //Puntajes agregados por categoría
           "contract_score": {
               "total_score": 0.5657309760132341,
               "trans": 0.3879239040529363,
               "temp": 0.25,
               "comp": 1,
               "traz": 0.625
           },
           //Puntajes de cada evaluación en este contrato en grupos por categoría
           "rules_score": {
               "trans": {
                   "trans-ov": 0,
                   "trans-sc": 0.8333333333333334,
                   "trans-ccm": 0.5645161290322581,
                   "trans-cc": 0.15384615384615385
               },
               "temp": {
                   "temp-cft": 0,
                   "temp-tipo": 0,
                   "temp-dl": 0,
                   "temp-fs": 1
               },
               "comp": {
                   "comp-cfc": 1,
                   "comp-pf": 1
               },
               "traz": {
                   "traz-ei": 0,
                   "traz-cft": 0,
                   "traz-mc": 1,
                   "traz-ip": 0,
                   "traz-pf": 1,
                   "traz-ir": 1,
                   "traz-ct": 1,
                   "traz-fro": 1
               }
           }
       }

   ]
