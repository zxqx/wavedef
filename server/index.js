var express = require('express');
var path = require('path');
var app = express();

var conString = process.env.DATABASE_URL;
var port = process.env.PORT || 8080;

process.env.PWD = process.cwd();

/**
 * Serve static files
 */
app.use(express.static(process.env.PWD + '/dist'));

app.listen(port);
