'use strict';

const bodyParser = require('body-parser'); 
const express = require('express');

const router = require('./controllers/users');

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

app.listen(process.env.PORT, function() {
  console.log(`Listening on port ${process.env.PORT}`)
})