const chalk = require('chalk');
const listAll = require('./listAll');
const pullOne = require('./pullOne');
const { ErrorType } = require('./error');

module.exports = async () => {
  const templates = await listAll();
  const results = await Promise.all(templates.map((t) => pullOne(t).catch((e) => e)));

  results.forEach(({ name, error }) => {
    if (error) {
      if (error.message !== ErrorType.NOT_FOUND) {
        console.log(chalk.red(error));
      }
    } else {
      console.log(chalk.green(`${name}: Pulled from SES successfully!`));
    }
  });
};
