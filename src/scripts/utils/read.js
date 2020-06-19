const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const { PUBLIC_DIR } = require('./constants');

module.exports = async ({ name }) => {
  const readFile = util.promisify(fs.readFile);
  const dir = `${PUBLIC_DIR}/${name}`;

  console.log('Reading template parts...');
  try {
    const SubjectPart = await readFile(`${dir}/template.json`, 'utf8').then(
      (res) => JSON.parse(res).subject
    );
    const HtmlPart = await readFile(`${dir}/index.html`, 'utf8');
    const TextPart = await readFile(`${dir}/index.txt`, 'utf8');

    return {
      Template: {
        TemplateName: name,
        SubjectPart,
        HtmlPart,
        TextPart,
      },
    };
  } catch (error) {
    console.log(chalk.red(error));
    throw new Error('read');
  }
};
