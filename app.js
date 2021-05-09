const express = require('express');
const exegesisExpress = require('exegesis-express');
const http = require('http');
const path = require('path');
const exegesisSwaggerUIPlugin = require( 'exegesis-plugin-swagger-ui-express' );
const pjson = require('./package.json');

async function createServer() {
    const app = express();

    

    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
        response.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
        response.header('Cache-Control', 'public; max-age: 700');

        return next();
    });

    // See https://github.com/exegesis-js/exegesis/blob/master/docs/Options.md
    const options = {
        controllers: path.resolve(__dirname, './controllers'),
        allErrors: true,
        plugins: [
            exegesisSwaggerUIPlugin({
                // Express app (required)
                app: app,     
                path:"/v3/docs",
                // Options to pass to Swagger UI
                swaggerUIOptions: {
                    explorer: true
                }
            })
        ]    
    };

    const exegesisMiddleware = await exegesisExpress.middleware(
        path.resolve(__dirname, './swagger.json'),
        options
    );


    // If you have any body parsers, this should go before them.
    app.use(exegesisMiddleware);

    app.use((req, res) => {
        res.status(404).json({
            es: `Aquí no hay nada. Por favor revisa la documentación: https://qqwapi-elastic.readthedocs.io/es/latest/`,
            en: `There's nothing here. Please check the docs: https://qqwapi-elastic.readthedocs.io/es/latest/ (only in spanish)`,
            version: pjson.version,
            generated: new Date()
        });
    });

    app.use((err, req, res, next) => {
        console.error("Internal error",req.route.path, err.meta ? err.meta.meta.request.params :"", err.meta ? err.meta.body ? err.meta.body.error : "" : "", err);
        res.status(500).json({"Internal error": err.message});

        //If connection is lost to database, kill API process
        if (err.name == 'ConnectionError') {
            process.exit(-1);
        }
    });

      

    const server = http.createServer(app);

    
    const port = process.env.PORT || 10010;

    const l = server.listen(port, () => {
        process.stdout.write(`Listening on http://localhost:${l.address().port}/\n`);
    });
}

createServer();