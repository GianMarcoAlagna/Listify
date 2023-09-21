const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.use('/hello', (req, res) => {
    res.status(200).send('Hello World!');
});

app.use('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

module.exports = app;