const chalk = require('chalk');
const get = require('./utils/get');
const write = require('./utils/write');
const addToIndex = require('./utils/addToIndex');
const { errorCodes, exitOnError } = require('./utils/error');

module.exports = async ({ name }) => {
  const template = await get(name).catch(exitOnError);

  if (!template) {
    console.log(chalk.red(`Template ${name} does not exist`));
    process.exit(errorCodes.notFound);
  }

  await write({ name, template }).catch(exitOnError);
  await addToIndex(name).catch(exitOnError);

  console.log(chalk.green(`Successfully pulled ${name} from SES!`));
};
