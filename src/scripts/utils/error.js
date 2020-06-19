const chalk = require('chalk');

const errorCodes = {
  ok: 0,
  default: 1,
  read: 2,
  write: 3,
  delete: 4,
  notFound: 5,
  conflict: 6,
  proxy: 7,
};

const exitOnError = (error) => {
  console.log(chalk.red(error));
  if (errorCodes[error.message] !== undefined) {
    process.exit(errorCodes[error.message]);
  }
  process.exit(errorCodes.default);
};

const errors = (errorCode) => (error) => {
  console.log(chalk.red(error));
  process.exit(errorCode);
};

module.exports = { errorCodes, exitOnError, errors };
