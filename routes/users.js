const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUserController,
  getMeController,
} = require('../controllers/users');

router.get('/users/me', (req, res) => {
  getMeController(req, res);
});

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), (req, res) => {
  updateUserController(req, res);
});

module.exports = router;
