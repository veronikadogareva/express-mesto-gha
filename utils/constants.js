const ERROR_BAD_REQUEST = 400;
const MESSAGE_ERROR_BAD_REQUEST = { message: 'Неверный запрос. Пожалуйста, проверьте введенные данные и повторите запрос.' };
const ERROR_NOT_FOUND = 404;
const MESSAGE_ERROR_NOT_FOUND = { message: 'Данные с указанным идентификатором не найдены.' };
const ERROR_DEFAULT = 500;
const MESSAGE_ERROR_DEFAULT = { message: 'Внутренняя ошибка сервера.' };
module.exports = {
  ERROR_BAD_REQUEST,
  MESSAGE_ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  MESSAGE_ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  MESSAGE_ERROR_DEFAULT,
}