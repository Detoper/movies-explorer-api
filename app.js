require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const PORT = 3000;
const app = express();

const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const authRouter = require('./routes/auth');

const auth = require('./middlewares/auth');
const { errProcessing } = require('./errors/err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(bodyParser.json());
app.use(cors());
mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// логгер запросов
app.use(requestLogger);

app.use(authRouter);

app.use(auth);

app.use(userRouter);
app.use(movieRouter);
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
