const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createUserController,
  loginController,
} = require('../controllers/auth');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), (req, res) => {
  createUserController(req, res);
});

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), (req, res) => {
  loginController(req, res);
});

module.exports = router;
