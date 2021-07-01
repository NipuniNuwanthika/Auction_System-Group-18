'use strict'

//Import cross origins
const cors = require('cors');
//Import express
const express = require('express');
//Import Configurations 
const config = require('./config/config');
//import controllers js
const routes = require('./routes');
//import MongoDB
var mongoose = require('mongoose');
//import http
const http = require('http');
//import logger config
const log4js = require('log4js');

const fileupload = require('express-fileupload'); // file upload lib


const server = express();
//Allow cross origins
server.use(cors());

// Allow using file upload
server.use(fileupload());

//Set constant server port
const server_port = config.web_port;
//set routes
server.use(routes);

server.use(express.static(__dirname));

//Database Connection initiation
mongoose.connect('mongodb:' + config.database,{ useMongoClient: true });
var database = mongoose.connection;
mongoose.set('debug', true);

//import http library
var httpServer = http.createServer(server);


// config
log4js.configure({
  appenders: {
    FDLogs: { type: 'file', filename: 'serverLogs.log' },
    console: { type: 'console' }
  },
  categories: {
    callback: { appenders: ['FDLogs'], level: 'error' },
    default: { appenders: ['console', 'FDLogs'], level: 'debug' }
  }
});
// define logger
const logger = log4js.getLogger('log4jslog');

server.use(log4js.connectLogger(logger, { level: 'auto' }));

server.get('/token', (req, res, next) => {
  console.log("token")
  console.log(req.params);
  console.log(req);
  console.log(req.body);
});

//start server...
httpServer.listen(server_port, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('server listening on port : ' + server_port);
});


