const chalk = require('chalk');

const ErrorTypes = {
  OK: 'OK',
  DEFAULT: 'DEFAULT',
  IO: 'IO',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  PROXY: 'PROXY',
};

const ErrorCode = {
  OK: 0,
  DEFAULT: 1,
  IO: 2,
  NOT_FOUND: 3,
  CONFLICT: 4,
  PROXY: 5,
};

const exitWithCode = (errorCode) => (error) => {
  console.log(chalk.red(error));
  process.exit(errorCode);
};

module.exports = { ErrorTypes, ErrorCode, exitWithCode };
