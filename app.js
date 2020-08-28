const express = require('express');
const exegesisExpress = require('exegesis-express');
const http = require('http');
const path = require('path');
const exegesisSwaggerUIPlugin = require( 'exegesis-plugin-swagger-ui-express' );
 
async function createServer() {
    const app = express();

    

    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
        response.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
      
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
                path:"/docs",
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
        res.status(404).json({message: `There's nothing here. Please check the docs. QQWAPIv3`});
    });

    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).json({message: `Internal error: ${err.message}`});
    });

      

    const server = http.createServer(app);

    
    const port = process.env.PORT || 10010;

    const l = server.listen(port, () => {
        process.stdout.write(`Listening on port ${l.address().port}`);
    });
}

createServer();