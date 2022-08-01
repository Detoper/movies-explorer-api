const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUserController,
  getMeController,
} = require('../controllers/users');

router.get('/users/me', (req, res, next) => {
  getMeController(req, res, next);
});

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), (req, res, next) => {
  updateUserController(req, res, next);
});

module.exports = router;
