const User = require('../models/user');

const ERROR_BAD_REQUEST = 400;
const MESSAGE_ERROR_BAD_REQUEST = { message: 'Неверный запрос. Пожалуйста, проверьте введенные данные и повторите запрос.' };
const ERROR_NOT_FOUND = 404;
const MESSAGE_ERROR_NOT_FOUND = { message: 'Данные с указанным идентификатором не найдены.' };
const ERROR_DEFAULT = 500;
const MESSAGE_ERROR_DEFAULT = { message: 'Внутренняя ошибка сервера.' };

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(ERROR_DEFAULT).send(MESSAGE_ERROR_DEFAULT);
    });
};
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send(MESSAGE_ERROR_BAD_REQUEST);
      } else {
        res.status(ERROR_DEFAULT).send(MESSAGE_ERROR_DEFAULT);
      }
    });
};
const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send(MESSAGE_ERROR_NOT_FOUND);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send(MESSAGE_ERROR_BAD_REQUEST);
      } else {
        res.status(ERROR_DEFAULT).send(MESSAGE_ERROR_DEFAULT);
      }
    });
};

const updateUserProfile = (req, res) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send(MESSAGE_ERROR_NOT_FOUND);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send(MESSAGE_ERROR_BAD_REQUEST);
      } else {
        res.status(ERROR_DEFAULT).send(MESSAGE_ERROR_DEFAULT);
      }
    });
};
const updateUserAvatar = (req, res) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send(MESSAGE_ERROR_NOT_FOUND);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send(MESSAGE_ERROR_BAD_REQUEST);
      } else {
        res.status(ERROR_DEFAULT).send(MESSAGE_ERROR_DEFAULT);
      }
    });
};
module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUserProfile,
  updateUserAvatar,
};