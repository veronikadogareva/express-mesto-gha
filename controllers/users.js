const User = require('../models/user');
const {
  ERROR_BAD_REQUEST,
  MESSAGE_ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  MESSAGE_ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  MESSAGE_ERROR_DEFAULT,
} = require('../utils/constants');

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
      res.status(201).send(user);
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
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send(MESSAGE_ERROR_NOT_FOUND);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send(MESSAGE_ERROR_BAD_REQUEST);
      } else {
        res.status(ERROR_DEFAULT).send(MESSAGE_ERROR_DEFAULT);
      }
    });
};
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send(MESSAGE_ERROR_NOT_FOUND);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
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
