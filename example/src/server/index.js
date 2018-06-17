const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(process.env.PWD + '/build'));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: process.env.PWD + '/build' });
});

app.listen(port);
