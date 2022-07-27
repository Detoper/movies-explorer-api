const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');

const PORT = 3000;
const app = express();
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const {
  createUserController,
  loginController,
} = require('./controllers/auth');
const auth = require('./middlewares/auth');
const { errProcessing } = require('./errors/err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(bodyParser.json());
app.use(cors());
mongoose.connect('mongodb://localhost:27017/moviesExprorerdb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// логгер запросов
app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), createUserController);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), loginController);

app.use(auth);

app.use('/', userRouter);
app.use('/', movieRouter);
// логгер ошибок
app.use(errorLogger);
// обработка ошибок celebrate
app.use(errors());
// централизованная обработка ошибок
app.use((err, req, res, next) => {
  const errObj = errProcessing(err);
  res
    .status(errObj.status)
    .send({ message: errObj.message });
  next();
});

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
