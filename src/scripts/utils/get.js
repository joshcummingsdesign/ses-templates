const chalk = require('chalk');
const SES = require('./ses');

module.exports = async (name) => {
  console.log('Checking for existing templates in SES...');
  const template = await SES.getTemplate({ TemplateName: name })
    .promise()
    .then((res) => {
      console.log('Template found in SES');
      return res.Template;
    })
    .catch((error) => {
      if (!error.message.includes('does not exist')) {
        console.log(chalk.red(error));
        throw new Error('proxy');
      }
    });

  return template || undefined;
};
