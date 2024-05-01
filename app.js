//MAS ACTUALIZADO

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const toolsRouter = require('./tools.js');

const app = express();

// Serves Express Yourself website
app.use(express.static('public'));
app.use(bodyParser.json());

app.use(cors());
app.use('/tools', toolsRouter);

module.exports = app;
