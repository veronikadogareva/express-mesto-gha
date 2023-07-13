const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверный запрос. Пожалуйста, проверьте введенные данные и повторите запрос.'));
      } else {
        next(err);
      }
    });
};
const deleteCard = (req, res) => {
  const id = req.params.cardId;
  Card.findByIdAndRemove(id)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным идентификатором не найдена.'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный запрос. Пожалуйста, проверьте введенные данные и повторите запрос.'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res) => {
  const id = req.params.cardId;
  Card.findByIdAndUpdate(id, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным идентификатором не найдена.'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный запрос. Пожалуйста, проверьте введенные данные и повторите запрос.'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res) => {
  const id = req.params.cardId;
  Card.findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным идентификатором не найдена.'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный запрос. Пожалуйста, проверьте введенные данные и повторите запрос.'));
      } else {
        next(err);
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
