const chalk = require('chalk');

module.exports = (exitCode) => (error) => {
  console.log(chalk.red(error));
  process.exit(exitCode);
};
