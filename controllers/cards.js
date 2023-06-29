const Card = require('../models/card');

const ERROR_BAD_REQUEST = 400;
const MESSAGE_ERROR_BAD_REQUEST = { message: 'Неверный запрос. Пожалуйста, проверьте введенные данные и повторите запрос.' };
const ERROR_NOT_FOUND = 404;
const MESSAGE_ERROR_NOT_FOUND = { message: 'Данные с указанным идентификатором не найдены.' };
const ERROR_DEFAULT = 500;
const MESSAGE_ERROR_DEFAULT = { message: 'Внутренняя ошибка сервера.' };

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(ERROR_DEFAULT).send(MESSAGE_ERROR_DEFAULT);
    });
};
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send(MESSAGE_ERROR_BAD_REQUEST);
      } else {
        res.status(ERROR_DEFAULT).send(MESSAGE_ERROR_DEFAULT);
      }
    });
};
const deleteCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndDelete({ id })
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send(MESSAGE_ERROR_NOT_FOUND);
      } else {
        res.send(card);
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

const likeCard = (req, res) => {
  const id = req.params.cardId;
  Card.findByIdAndUpdate(id, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send(MESSAGE_ERROR_NOT_FOUND);
      } else {
        res.send(card);
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

const dislikeCard = (req, res) => {
  const id = req.params.cardId;
  Card.findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send(MESSAGE_ERROR_NOT_FOUND);
      } else {
        res.send(card);
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
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
