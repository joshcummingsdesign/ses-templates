const chalk = require('chalk');
const errors = require('./errors');
const SES = require('./ses');
const read = require('./read');

module.exports = async ({ name }) => {
  console.log('Checking for existing templates in SES...');
  let exists = true;
  await SES.getTemplate({ TemplateName: name })
    .promise()
    .catch((error) => {
      if (error.message.includes('does not exist')) {
        exists = false;
      } else {
        console.log(chalk.red(error));
        process.exit(1);
      }
    });

  const template = await read({ name }).catch(errors(2));

  const successMessage = chalk.green(`Successfully pushed ${name} to SES!`);
  if (exists) {
    console.log('Template found in SES');
    console.log('Updating template in SES...');
    await SES.updateTemplate(template).promise().catch(errors(3));
    console.log(successMessage);
  } else {
    console.log('Template not found in SES');
    console.log('Creating template in SES...');
    await SES.createTemplate(template).promise().catch(errors(4));
    console.log(successMessage);
  }
};
