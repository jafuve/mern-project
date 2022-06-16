const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Auth route
const auth = require('./routes/auth');

app.use(
    '/api/v1', 
    [auth]
    );

module.exports = app;