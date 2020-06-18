const chalk = require('chalk');
const errors = require('./errors');
const SES = require('./ses');
const write = require('./write');

module.exports = async ({ name }) => {
  const template = await SES.getTemplate({ TemplateName: name })
    .promise()
    .then((res) => res.Template)
    .catch(errors(1));

  await write({ name, template }).catch(errors(2));

  console.log(chalk.green(`Successfully pulled ${name} from SES!`));
};
