const chalk = require('chalk');
const pushOne = require('./utils/pushOne');
const pushAll = require('./utils/pushAll');
const { ErrorCode } = require('./utils/error');

module.exports = async (argv) => {
  if (argv.name) {
    const res = await pushOne(argv);
    if (res.error) {
      process.exit(ErrorCode[res.error.message]);
    } else {
      console.log(chalk.green(`${res.name}: Pushed to SES successfully!`));
    }
  } else {
    await pushAll();
  }
};
