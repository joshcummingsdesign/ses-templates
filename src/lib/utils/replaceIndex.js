const fs = require('fs');
const util = require('util');
const { PUBLIC_DIR } = require('./constants');
const { ErrorCode, exitWithCode } = require('./error');

module.exports = async (searchValue, replaceValue) => {
  const readFile = util.promisify(fs.readFile);
  const writeFile = util.promisify(fs.writeFile);
  const indexFile = `${PUBLIC_DIR}/index.html`;
  const homepage = await readFile(indexFile, 'utf8').catch(exitWithCode(ErrorCode.IO));
  const updatedHomepage = homepage.replace(searchValue, replaceValue);

  await writeFile(indexFile, updatedHomepage).catch(exitWithCode(ErrorCode.IO));
};
