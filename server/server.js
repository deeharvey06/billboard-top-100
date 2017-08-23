const express = require('express');
const app = express();
const http = require('http');
const billboardController = require('./billboardController');



app.get('/',billboardController.Pop);
app.get('/');


const server = app.listen(3000);

module.exports = server;