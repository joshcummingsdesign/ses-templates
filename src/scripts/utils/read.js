const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const { PUBLIC_DIR } = require('./constants');
const { ErrorCode, exitWithCode } = require('./error');

module.exports = async ({ name }) => {
  const readFile = util.promisify(fs.readFile);
  const dir = `${PUBLIC_DIR}/${name}`;

  console.log(chalk.gray(`${name}: Reading template files...`));
  const HtmlPart = await readFile(`${dir}/index.html`, 'utf8').catch(exitWithCode(ErrorCode.IO));
  const TextPart = await readFile(`${dir}/index.txt`, 'utf8').catch(exitWithCode(ErrorCode.IO));
  const SubjectPart = await readFile(`${dir}/template.json`, 'utf8')
    .then((res) => JSON.parse(res).subject)
    .catch(exitWithCode(ErrorCode.IO));

  return {
    Template: {
      TemplateName: name,
      SubjectPart,
      HtmlPart,
      TextPart,
    },
  };
};
