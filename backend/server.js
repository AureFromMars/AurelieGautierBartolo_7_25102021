// N.B. Node.js is an executing JavaScript environment to build server side services : API (Application Programming Interface)

// Imports
const dotenv = require('dotenv');// dotenv to create environment variables // One time needed at the beggining
dotenv.config();// Could be included in above line

const http = require('http');
const app = require('./app');// Import app.js

// Define, nomalize a valid prot : number or string
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {return val;}
    if (port >= 0) {return port;}
    return false;
};
const port = normalizePort(process.env.PORT);// Nomalize port witch number is stored in .env
app.set('port', port);// Create, set port in app.js

const server = http.createServer(app);// Calling function to app.js

const address = server.address();
const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;

// Event listener for HTTP server "error" event
const errorHandler = error => {// Search and manage errors
    if (error.syscall !== 'listen') {throw error;}
    switch (error.code) {// Similare instruction than if...else
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
        break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
        break;
        default: throw error;
    }
};
server.on('error', errorHandler);

// Event listerner for HTTP server "listening" event with port in console
server.on('listening', () => {
    console.log('Server is running on ' + bind);
});

server.listen(port);