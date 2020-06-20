const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const replaceIndex = require('./replaceIndex');
const { templatePart, listItem } = require('./templates');
const { PUBLIC_DIR } = require('./constants');
const { ErrorCode, exitWithCode } = require('./error');

module.exports = async (name) => {
  const readFile = util.promisify(fs.readFile);
  const indexFile = `${PUBLIC_DIR}/index.html`;
  const homepage = await readFile(indexFile, 'utf8').catch(exitWithCode(ErrorCode.IO));
  const item = listItem(name);

  if (!homepage.includes(item)) {
    console.log(chalk.gray(`${name}: Adding to site index...`));
    const spaces = ' '.repeat(8);
    const replaceValue = `${item}\n${spaces}${templatePart}`;
    await replaceIndex(templatePart, replaceValue);
  }
};
