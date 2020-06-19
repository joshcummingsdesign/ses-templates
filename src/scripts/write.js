const chalk = require('chalk');
const fs = require('fs');
const util = require('util');
const { PUBLIC_DIR } = require('./constants');

module.exports = async ({ name, template }) => {
  const writeFile = util.promisify(fs.writeFile);
  const dir = `${PUBLIC_DIR}/${name}`;
  const { HtmlPart, TextPart, SubjectPart } = template;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  console.log('Writing to template parts to file system...');
  try {
    await writeFile(`${dir}/index.html`, HtmlPart);
    await writeFile(`${dir}/index.txt`, TextPart);
    await writeFile(`${dir}/template.json`, JSON.stringify({ subject: SubjectPart }));
  } catch (error) {
    console.log(chalk.red(error));
    process.exit(1);
  }
};
