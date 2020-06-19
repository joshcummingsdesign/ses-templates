const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const pushOne = require('./pushOne');
const { PUBLIC_DIR } = require('./constants');
const { ErrorCode, exitWithCode } = require('./error');

module.exports = async () => {
  const readdir = util.promisify(fs.readdir);
  const directories = await readdir(PUBLIC_DIR, { withFileTypes: true }).catch(
    exitWithCode(ErrorCode.IO)
  );

  const templates = directories
    .filter((dirent) => dirent.isDirectory())
    .map((dir) => ({ name: dir.name }));

  const results = await Promise.all(templates.map((t) => pushOne(t).catch((e) => e)));

  results.forEach(({ name, error }) => {
    if (error) {
      console.log(chalk.red(error));
    } else {
      console.log(chalk.green(`${name}: Pushed to SES successfully!`));
    }
  });
};
