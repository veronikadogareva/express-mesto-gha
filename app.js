const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const {login, createUser} = require('./controllers/users');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.json());
app.use(helmet());
app.use(cookieParser());
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});
app.use(error);
app.listen(PORT);
