const pattern = require('./linkPattern');

function urlValMethod(value) {
  if (!value || pattern.test(value)) {
    return value;
  }
  throw new Error('Ссылка не соответствует модели');
}

module.exports = { urlValMethod };
