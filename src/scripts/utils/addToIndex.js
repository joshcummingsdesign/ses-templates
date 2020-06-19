const replaceIndex = require('./replaceIndex');

module.exports = async (name) => {
  console.log('Updating site index...');
  const spaces = ' '.repeat(8);
  const comment = '<!-- {{ TemplatePart }} // Do not remove this comment -->';
  const listItem = `<li><a href="/${name}">${name}</a></li>\n${spaces}${comment}`;
  await replaceIndex(comment, listItem);
};
