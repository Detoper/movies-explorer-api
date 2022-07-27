const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const createUserController = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  console.log('1', password);
  User.findOne({ email })
    .then((user) => {
      if (user) {
        const err = new Error('Попытка повторного создания объекта');
        err.name = 'ConflictError';
        throw err;
      }
    })
    .then(() => bcrypt.hash(password, 10))
    .then((hash) => {
      console.log('2', hash);
      if (!validator.isEmail(email)) {
        const err = new Error('Почта не соответствует модели почты');
        err.name = 'NotCorrectError';
        throw err;
      }
      User.create({
        name, email, password: hash,
      });
    })
    .then((user) => res.status(201).send({ data: { user, message: 'Created' } }))
    .catch(next);
};

const loginController = (req, res, next) => {
  const { email, password } = req.body;
  let id = '';
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const err = new Error('Неправильные почта или пароль');
        err.name = 'NotCorrectError';
        throw err;
      }
      id = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        const err = new Error('Неправильные почта или пароль');
        err.name = 'NotCorrectError';
        throw err;
      }
      const token = jwt.sign({ _id: id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  createUserController,
  loginController,
};
