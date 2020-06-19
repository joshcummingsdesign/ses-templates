const util = require('util');
const chalk = require('chalk');
const rimraf = require('rimraf');
const SES = require('./utils/ses');
const get = require('./utils/get');
const removeFromIndex = require('./utils/removeFromIndex');
const { PUBLIC_DIR } = require('./utils/constants');
const { errorCodes, exitOnError, errors } = require('./utils/error');

module.exports = async ({ name }) => {
  const rm = util.promisify(rimraf);
  const existing = await get(name).catch(exitOnError);
  const dir = `${PUBLIC_DIR}/${name}`;

  console.log('Cleaning up directories...');
  await rm(dir).catch(errors(errorCodes.delete));
  await removeFromIndex(name).catch(exitOnError);

  if (!existing) {
    console.error(chalk.red(`Template ${name} does not exist`));
    process.exit(errorCodes.conflict);
  }

  await SES.deleteTemplate({ TemplateName: name }).promise().catch(errors(errorCodes.proxyError));

  console.log(chalk.green(`Tempalte ${name} deleted successfully!`));
};
