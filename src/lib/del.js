const util = require('util');
const rimraf = require('rimraf');
const chalk = require('chalk');
const SES = require('./utils/ses');
const get = require('./utils/get');
const removeFromIndex = require('./utils/removeFromIndex');
const { ErrorCode, exitWithCode } = require('./utils/error');
const { PUBLIC_DIR } = require('./utils/constants');

module.exports = async ({ name }) => {
  const rm = util.promisify(rimraf);
  const existing = await get(name);
  const dir = `${PUBLIC_DIR}/${name}`;

  console.log(chalk.gray(`${name}: Removing directory...`));
  await rm(dir).catch(exitWithCode(ErrorCode.IO));
  await removeFromIndex(name);

  if (!existing) {
    console.log(`${name}: Template not found in SES`);
  } else {
    await SES.deleteTemplate({ TemplateName: name }).promise().catch(exitWithCode(ErrorCode.PROXY));
    console.log(chalk.green(`${name}: Template deleted successfully!`));
  }
};
