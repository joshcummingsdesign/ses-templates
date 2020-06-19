const chalk = require('chalk');
const SES = require('./ses');
const get = require('./get');
const read = require('./read');
const { ErrorType } = require('./error');

module.exports = async ({ name }) => {
  const existing = await get(name);
  const template = await read({ name });

  let error;
  if (existing) {
    console.log(chalk.gray(`${name}: Updating template in SES...`));
    await SES.updateTemplate(template)
      .promise()
      .catch((error) => {
        console.log(chalk.red(error));
        error = new Error(ErrorType.PROXY);
      });
  } else {
    console.log(chalk.gray(`${name}: Creating template in SES...`));
    await SES.createTemplate(template)
      .promise()
      .catch((error) => {
        console.log(chalk.red(error));
        error = new Error(ErrorType.PROXY);
      });
  }

  return { name, error };
};