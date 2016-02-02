var express = require('express');
var path = require('path');
var app = express();

var port = process.env.PORT || 8080;

process.env.PWD = process.cwd();
app.use(express.static(process.env.PWD + '/dist'));

app.listen(port);
