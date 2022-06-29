const express = require('express');
const path = require('path');
require('dotenv').config();

// App de express
const app = express();

//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');
const {PORT} = process.env

// Path publico

const publicPath = path.resolve( __dirname, 'public');


app.use( express.static(publicPath));


server.listen(PORT, (err )=>{
    if (err) throw new Error(err);
    console.log("Servidor corriendo en puerto", PORT);
});