const mongoose = require('mongoose');
const validator = require('validator');

// описание схемы пользователя
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: () => 'Почта не соответсвует модели почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

// Создание модели
module.exports = mongoose.model('user', userSchema);
