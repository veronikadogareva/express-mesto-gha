const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use((req, res, next) => {
  req.user = {
    _id: '649b06fe957b6fc8b5d04b9c',
  };
  next();
});
app.use(bodyParser.json());
app.use(helmet());
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});
app.listen(PORT);
