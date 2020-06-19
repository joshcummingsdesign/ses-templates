const chalk = require('chalk');
const get = require('./utils/get');
const write = require('./utils/write');
const addToIndex = require('./utils/addToIndex');
const { ErrorCode } = require('./utils/error');

module.exports = async ({ name }) => {
  const template = await get(name);

  if (!template) {
    console.log(chalk.red(`${name}: Template does not exist`));
    process.exit(ErrorCode.NOT_FOUND);
  }

  await write({ name, template });
  await addToIndex(name);

  console.log(chalk.green(`${name}: Successfully pulled from SES!`));
};
