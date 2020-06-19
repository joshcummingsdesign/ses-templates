const chalk = require('chalk');
const SES = require('./ses');
const pullOne = require('./pullOne');
const { ErrorType, ErrorCode, exitWithCode } = require('./error');

module.exports = async () => {
  const templates = await SES.listTemplates()
    .promise()
    .then((res) => {
      if (res.TemplatesMetadata.length) {
        return res.TemplatesMetadata.map((t) => ({ name: t.Name }));
      }
      return [];
    })
    .catch(exitWithCode(ErrorCode.PROXY));

  const results = await Promise.all(templates.map((t) => pullOne(t).catch((e) => e)));

  results.forEach(({ name, error }) => {
    if (error) {
      if (error.message !== ErrorType.NOT_FOUND) {
        console.log(chalk.red(error));
      }
    } else {
      console.log(chalk.green(`${name}: Pulled from SES successfully!`));
    }
  });
};
