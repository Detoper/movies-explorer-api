const Movie = require('../models/movie');

const getMoviesController = (req, res, next) => {
  Movie.find()
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch(next);
};

const createMovieController = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send({ data: { movie, message: 'Created' } }))
    .catch(next);
};

const deleteMovieController = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        const err = new Error('Объект не найден');
        err.name = 'CastError';
        throw err;
      }
      if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(req.params.movieId);
      } else {
        const err = new Error('Нет прав');
        err.name = 'ForbiddenError';
        throw err;
      }
    })
    .then((movie) => {
      if (!movie) {
        const err = new Error('Объект не найден');
        err.name = 'CastError';
        throw err;
      }
      res.send({ data: movie });
    })
    .catch(next);
};

module.exports = {
  getMoviesController,
  createMovieController,
  deleteMovieController,
};
