const chalk = require('chalk');
const replaceIndex = require('./replaceIndex');
const { listItem } = require('./templates');

module.exports = async (name) => {
  console.log(chalk.gray(`${name}: Removing from site index...`));
  const spaces = ' '.repeat(8);
  const searchValue = `${spaces}${listItem(name)}\n`;
  await replaceIndex(searchValue, '');
};
