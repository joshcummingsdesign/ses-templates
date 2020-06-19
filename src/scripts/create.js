const chalk = require('chalk');
const fs = require('fs');
const util = require('util');
const errors = require('./errors');
const write = require('./write');
const { PUBLIC_DIR } = require('./constants');

module.exports = async ({ name }) => {
  const readFile = util.promisify(fs.readFile);
  const writeFile = util.promisify(fs.writeFile);
  const dir = `${PUBLIC_DIR}/${name}`;

  if (fs.existsSync(dir)) {
    console.error(chalk.red(`Template ${name} already exists`));
    process.exit(1);
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

  await write({ name, template }).catch(errors(2));

  console.log('Updating site index...');
  const indexFile = `${PUBLIC_DIR}/index.html`;
  const spaces = '        ';
  const comment = '<!-- {{ TemplatePart }} // Do not remove this comment -->';

  const homepage = await readFile(indexFile, 'utf8').catch(errors(3));

  const updatedHomepage = homepage.replace(
    comment,
    `<li><a href="/${name}">${name}</a></li>\n${spaces}${comment}`
  );

  await writeFile(indexFile, updatedHomepage).catch(errors(4));
};
