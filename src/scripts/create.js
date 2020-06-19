const fs = require('fs');
const chalk = require('chalk');
const get = require('./utils/get');
const write = require('./utils/write');
const addToIndex = require('./utils/addToIndex');
const { subjectTemplate, htmlTemplate, textTemplate } = require('./utils/templates');
const { PUBLIC_DIR } = require('./utils/constants');
const { ErrorCode } = require('./utils/error');

module.exports = async ({ name }) => {
  const existing = await get(name);
  const dir = `${PUBLIC_DIR}/${name}`;

  if (existing || fs.existsSync(dir)) {
    console.log(chalk.red(`${name}: Template already exists`));
    process.exit(ErrorCode.CONFLICT);
  } else {
    fs.mkdirSync(dir);
  }

  console.log(chalk.gray(`${name}: Creating template...`));
  const template = {
    TemplateName: name,
    SubjectPart: subjectTemplate,
    HtmlPart: htmlTemplate,
    TextPart: textTemplate,
  };
  await write({ name, template });
  await addToIndex(name);

  console.log(chalk.green(`${name}: Template created successfully!`));
};
