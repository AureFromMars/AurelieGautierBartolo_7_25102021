// N.B. Node.js is an executing JavaScript environment to build server side services : API (Application Programming Interface)

// Imports
const dotenv = require('dotenv');// dotenv to create environment variables // One time needed at the beggining
dotenv.config();// Could be included in above line

const http = require('http');
const app = require('./app');// Importer le app.js

// Définir, normaliser un port valide : numéro ou chaîne
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {return val;}
    if (port >= 0) {return port;}
    return false;
};
const port = normalizePort(process.env.PORT);// Normaliser le port dont le numéro est stocké dans .env
app.set('port', port);// Créer, setter le port dans app.js

const server = http.createServer(app);// Fonction d'appel d'app.js

const address = server.address();
const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;

// Event listener for HTTP server "error" event
const errorHandler = error => {//Rechercher et gérer les erreurs
    if (error.syscall !== 'listen') {throw error;}
    switch (error.code) {//Instruction similaire à if...else
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