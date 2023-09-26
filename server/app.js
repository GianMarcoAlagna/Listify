const express = require('express');
const path = require('path');
const cors = require('cors'); 
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const todoRouter = require('./routes/todoRouter');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
mongoose.connect(process.env.URI)
  .then(() => {
    console.log('Connected To Database');
  })
  .catch(err => console.log(`An Error Occurred -> ${err}`));

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET, POST, DELETE, PATCH',
  allowedHeaders: 'Content-Type',
  credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/user', userRouter);
app.use('/todo', todoRouter);

app.use('/build', express.static(path.resolve(__dirname, '../build')));
app.use('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// app.post('/login', (req, res) => {
//   res.sendStatus(200);
// });

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: {error: `an error occurred -> ${err}`},
  }
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;