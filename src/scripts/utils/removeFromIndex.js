const replaceIndex = require('./replaceIndex');

module.exports = async (name) => {
  console.log('Cleaning up site index...');
  const spaces = ' '.repeat(8);
  const listItem = `${spaces}<li><a href="/${name}">${name}</a></li>\n`;
  await replaceIndex(listItem, '');
};
