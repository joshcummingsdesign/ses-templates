const chalk = require('chalk');
const fs = require('fs');
const util = require('util');
const { TEMPLATE_DIR } = require('./constants');

module.exports = async ({ name }) => {
  const readFile = util.promisify(fs.readFile);
  const dir = `${TEMPLATE_DIR}/${name}`;

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
    process.exit(1);
  }
};
