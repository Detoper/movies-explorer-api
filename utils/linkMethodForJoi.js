const pattern = require('./linkPattern');

const urlValMethod = (value) => {
  if (value && value !== pattern) {
    return new Error('Ссылка не соответствует модели');
  }

  return value;
};

module.exports = { urlValMethod };
