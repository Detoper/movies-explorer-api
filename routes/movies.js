const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlValMethod } = require('../utils/linkMethodForJoi');

const {
  getMoviesController,
  createMovieController,
  deleteMovieController,
} = require('../controllers/movies');

router.get('/movies', (req, res) => {
  getMoviesController(req, res);
});

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValMethod, 'кастомная валидация URL'),
    trailerLink: Joi.string().required().custom(urlValMethod, 'кастомная валидация URL'),
    thumbnail: Joi.string().required().custom(urlValMethod, 'кастомная валидация URL'),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), (req, res) => {
  createMovieController(req, res);
});

router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), (req, res) => {
  deleteMovieController(req, res);
});

module.exports = router;
