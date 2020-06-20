const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const { PUBLIC_DIR } = require('./constants');
const { ErrorCode, exitWithCode } = require('./error');

module.exports = async ({ name, template }) => {
  const writeFile = util.promisify(fs.writeFile);
  const dir = `${PUBLIC_DIR}/${name}`;
  const { HtmlPart, TextPart, SubjectPart } = template;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  console.log(chalk.gray(`${name}: Writing template files...`));
  await writeFile(`${dir}/index.html`, HtmlPart).catch(exitWithCode(ErrorCode.IO));
  await writeFile(`${dir}/index.txt`, TextPart).catch(exitWithCode(ErrorCode.IO));
  await writeFile(`${dir}/template.json`, JSON.stringify({ subject: SubjectPart })).catch(
    exitWithCode(ErrorCode.IO)
  );
};
