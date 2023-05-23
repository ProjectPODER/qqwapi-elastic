# API for QuienEsQuien.wiki

QuienEsQuien.Wiki API. [DOCS](https://qqwapi-elastic.readthedocs.io/es/latest/).  [Source](https://github.com/projectpoder/qqwapi-elastic).

## v3.0

This API server is based in [Exegesis Express](https://github.com/exegesis-js/exegesis-express). It is configured via a [swagger.json](https://github.com/ProjectPODER/qqwapi-elastic/blob/main/swagger.json) file (based on the OpenAPI v3 specification).  It requires a running instance of [elastic-poppins](https://github.com/ProjectPODER/elastic-poppins).

## Usage

A public API console is available at: https://api.quienesquien.wiki/v3/docs

Once the API is running, check the [DOCS](https://qqwapi-elastic.readthedocs.io/es/latest/) for usage guidance.

Use the compainion [node-qqw](https://github.com/ProjectPODER/node-qqw/) client from NodeJS, or use [qqw-poppins](https://github.com/ProjectPODER/qqw-poppins/) as a full interface to browse the data.


## Installation for development

* Install and run [elastic-poppins](https://github.com/ProjectPODER/elastic-poppins).
* Clone Repo
* `npm install`
* Set ELASTIC_URI environment variable (ex: `ELASTIC_URI=https://user:pass@domain:port`)
* Start the server with `npm run start`
* Make requests to `http://localhost:10010`


## Deployment for production

* Build docker container 
* Set ELASTIC_URI environment variable (ex: `ELASTIC_URI=https://user:pass@domain:port`)
* Set `NODE_ENV=production`
* Run docker container. Only one instance is needed.
* 
