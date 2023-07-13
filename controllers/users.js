const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};
const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => {
      res.status(201).send({ message: `Пользователь ${req.body.email} успешно зарегестрирован.` });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверный запрос. Пожалуйста, проверьте введенные данные и повторите запрос.'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};
const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь с указанным идентификатором не найден.'));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(BadRequestError('Неверный запрос. Пожалуйста, проверьте введенные данные и повторите запрос.'));
      } else {
        next(err);
      }
    });
};
const getUserInfo = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь с указанным идентификатором не найден.'));
      } else {
        res.status(201).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(BadRequestError('Неверный запрос. Пожалуйста, проверьте введенные данные и повторите запрос.'));
      } else {
        next(err);
      }
    });
}
const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь с указанным идентификатором не найден.'));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(BadRequestError('Неверный запрос. Пожалуйста, проверьте введенные данные и повторите запрос.'));
      } else {
        next(err);
      }
    });
};
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь с указанным идентификатором не найден.'));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(BadRequestError('Неверный запрос. Пожалуйста, проверьте введенные данные и повторите запрос.'));
      } else {
        next(err);
      }
    });
};
const login = (req, res) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
  .then((user) => {
    if (!user) throw new UnauthorizedError('Неправильные почта или пароль');
    dataBaseUser = user;
    return bcrypt.compare(password, dataBaseUser.password);
  })
  .then((isValidPassword) => {
    if (!isValidPassword) throw new UnauthorizedError('Неправильные почта или пароль');
    const token = jwt.sign({ _id: dataBaseUser._id }, 'secret-key', { expiresIn: '7d' });
    return res.status(200).send({ token });
  })
  .catch(next);
};
module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUserProfile,
  updateUserAvatar,
  login,
  getUserInfo,
};
