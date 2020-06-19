const fs = require('fs');
const chalk = require('chalk');
const get = require('./utils/get');
const write = require('./utils/write');
const addToIndex = require('./utils/addToIndex');
const { PUBLIC_DIR } = require('./utils/constants');
const { errorCodes, exitOnError } = require('./utils/error');

module.exports = async ({ name }) => {
  const existing = await get(name).catch(exitOnError);
  const dir = `${PUBLIC_DIR}/${name}`;

  if (existing || fs.existsSync(dir)) {
    console.error(chalk.red(`Template ${name} already exists`));
    process.exit(errorCodes.conflict);
  } else {
    fs.mkdirSync(dir);
  }

  console.log(`Creating template ${name}...`);
  const template = {
    TemplateName: name,
    SubjectPart: 'Hello {{name}}',
    HtmlPart:
      '<!DOCTYPE html>\n' +
      '<html lang="en">\n' +
      '  <head>\n' +
      '    <meta charset="UTF-8" />\n' +
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
      '    <title>My Template</title>\n' +
      '  </head>\n' +
      '  <body>\n' +
      '    <main>\n' +
      '      <p>Hello {{name}},</p>\n' +
      '      <p>This is a test message.</p>\n' +
      '      <p>Regards, Josh</p>\n' +
      '    </main>\n' +
      '  </body>\n' +
      '</html>\n',
    TextPart: 'Hello {{name}},\nThis is a test message.\nRegards, Josh\n',
  };
  await write({ name, template }).catch(exitOnError);
  await addToIndex(name).catch(exitOnError);

  console.log(chalk.green(`Tempalte ${name} created successfully!`));
};
