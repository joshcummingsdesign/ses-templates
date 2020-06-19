const chalk = require('chalk');
const SES = require('./utils/ses');
const get = require('./utils/get');
const read = require('./utils/read');
const { errorCodes, exitOnError, errors } = require('./utils/error');

module.exports = async ({ name }) => {
  const existing = await get(name).catch(exitOnError);
  const template = await read({ name }).catch(exitOnError);
  const successMessage = chalk.green(`Successfully pushed ${name} to SES!`);

  if (existing) {
    console.log('Updating template in SES...');
    await SES.updateTemplate(template).promise().catch(errors(errorCodes.proxyError));
    console.log(successMessage);
  } else {
    console.log('Template not found in SES');
    console.log('Creating template in SES...');
    await SES.createTemplate(template).promise().catch(errors(errorCodes.proxyError));
    console.log(successMessage);
  }
};
