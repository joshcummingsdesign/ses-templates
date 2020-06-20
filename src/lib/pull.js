const chalk = require('chalk');
const pullOne = require('./utils/pullOne');
const pullAll = require('./utils/pullAll');
const { ErrorCode } = require('./utils/error');

module.exports = async (argv) => {
  if (argv.name) {
    const res = await pullOne(argv);
    if (res.error) {
      process.exit(ErrorCode[res.error.message]);
    } else {
      console.log(chalk.green(`${res.name}: Pulled from SES successfully!`));
    }
  } else {
    await pullAll();
  }
};
