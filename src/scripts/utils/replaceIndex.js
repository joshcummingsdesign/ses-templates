const fs = require('fs');
const util = require('util');
const { PUBLIC_DIR } = require('./constants');

module.exports = async (searchValue, replaceValue) => {
  const readFile = util.promisify(fs.readFile);
  const writeFile = util.promisify(fs.writeFile);
  const indexFile = `${PUBLIC_DIR}/index.html`;

  const homepage = await readFile(indexFile, 'utf8').catch((error) => {
    console.log(chalk.red(error));
    throw new Error('read');
  });

  if (replaceValue === '' || !homepage.includes(replaceValue)) {
    const updatedHomepage = homepage.replace(searchValue, replaceValue);
    await writeFile(indexFile, updatedHomepage).catch((error) => {
      console.log(chalk.red(error));
      throw new Error('write');
    });
  }
};
