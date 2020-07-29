const express = require('express');
const exegesisExpress = require('exegesis-express');
const http = require('http');
const path = require('path');
const exegesisSwaggerUIPlugin = require( 'exegesis-plugin-swagger-ui-express' );
 
async function createServer() {
    const app = express();

    // See https://github.com/exegesis-js/exegesis/blob/master/docs/Options.md
    const options = {
        controllers: path.resolve(__dirname, './controllers'),
        plugins: [
            exegesisSwaggerUIPlugin({
                // Express app (required)
                app: app,
     
                // URL path to expose API docs (default /)
                path: '/docs',
     
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
        res.status(404).json({message: `Not found`});
    });

    app.use((err, req, res, next) => {
        res.status(500).json({message: `Internal error: ${err.message}`});
    });

    const server = http.createServer(app);
    server.listen(10010);
    console.info("Listening on http://localhost:10010");
}

createServer();