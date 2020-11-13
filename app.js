const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const authMethod = require('./src/usuarios');

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

module.exports = app;
