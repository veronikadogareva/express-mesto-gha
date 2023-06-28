const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use('/users', usersRouter);

app.use((req, res, next) => {
  req.user = {
    _id: '649b06fe957b6fc8b5d04b9c',
  };

  next();
});
app.use('/cards', cardsRouter);

app.listen(3000);