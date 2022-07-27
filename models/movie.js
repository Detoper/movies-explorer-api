const mongoose = require('mongoose');

// const { pattern } = require('../utils/linkPattern');

// описание схемы фильма
const movieSchema = new mongoose.Schema({
  country: { // — страна создания фильма
    type: String,
    required: true,
  },
  director: { // — режиссёр фильма
    type: String,
    required: true,
  },
  duration: { // — длительность фильма
    type: Number,
    required: true,
  },
  year: { // — год выпуска фильма
    type: String,
    required: true,
  },
  description: { // — описание фильма
    type: String,
    required: true,
  },
  image: { // — ссылка на постер к фильму
    type: String,
    required: true,
  //   validate: {
  //     validator(v) {
  //       return pattern.test(v);
  //     },
  //     message: () => 'URL неверна',
  //   },
  },
  trailerLink: { // — ссылка на трейлер фильма
    type: String,
    required: true,
    // validate: {
    //   validator(v) {
    //     return pattern.test(v);
    //   },
    //   message: () => 'URL неверна',
    // },
  },
  thumbnail: { // — миниатюрное изображение постера к фильму
    type: String,
    required: true,
  //   validate: {
  //     validator(v) {
  //       return pattern.test(v);
  //     },
  //     message: () => 'URL неверна',
  //   },
  },
  owner: { // — _id пользователя, который сохранил фильм.
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: { // — id фильма, который содержится в ответе сервиса MoviesExplorer
    type: Number,
    required: true,
  },
  nameRU: { // — название фильма на русском языке
    type: String,
    required: true,
  },
  nameEN: { // — название фильма на английском языке
    type: String,
    required: true,
  },
});

// Создание модели
module.exports = mongoose.model('movie', movieSchema);
