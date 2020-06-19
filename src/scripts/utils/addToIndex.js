const chalk = require('chalk');
const replaceIndex = require('./replaceIndex');
const { templatePart, listItem } = require('./templates');

module.exports = async (name) => {
  console.log(chalk.gray(`${name}: Adding to site index...`));
  const spaces = ' '.repeat(8);
  const item = `${listItem(name)}\n${spaces}${templatePart}`;
  await replaceIndex(templatePart, item);
};
