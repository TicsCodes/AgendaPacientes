#!/usr/bin/env node
/**
 * Module dependencies.
 */
// var http = require('http');
import http from 'http';
// var debug = require('debug')('projnotes-ie22:server');
// signofica que esto se esta encadenado, importar y ejecutar lo importado
import Debug from 'debug';
// var app = require('../app');
// eslint-disable-next-line import/no-unresolved
import app from '@s/app';

// Importando nuestro logger
import winston from '../config/winston';

// Importando el objeto de las llaves de configuracion
import configKeys from '../config/configKeys';

// Creando instancia del debugger
const debug = Debug('projnotes-ie22:server');

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(configKeys.port || '5000');
app.set('port', port);

const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // console.error(bind + ' requires elevated privileges');//concatenacion de , template strings
      winston.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // console.error(bind + ' is already in use');
      winston.error(`${bind} is alredy in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  // var addr = server.address();
  // var bind = typeof addr === 'string'
  // ? 'pipe ' + addr
  // : 'port ' + addr.port;
  const addr = server.address();
  const bindAr =
    typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  // debug('Listening on ' + bind);
  debug(`Listening on ${bindAr}`);
  winston.info(`🦖🦬 Servidor escuchando 🐈‍⬛🐲....en ${app.get('port')}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port); // Pone al server a escuchar
// Se registran eventos
server.on('error', onError); // En caso de error
server.on('listening', onListening); // Cuando esta escuchando
