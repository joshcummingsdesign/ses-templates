import fs from 'fs';
import path from 'path';
import util from 'util';
import chalk from 'chalk';
import { replaceIndex } from './replaceIndex';
import { listItem } from '../templates';
import { PUBLIC_DIR } from '../utils/constants';
import { exitWithCode, ErrorCode } from '../utils/error';

/**
 * Add a template to the `index.html` file.
 */
export const addToIndex = async (name: string) => {
  const readFile = util.promisify(fs.readFile);
  const indexFile = path.join(PUBLIC_DIR, 'index.html');
  const homepage = await readFile(indexFile, 'utf8').catch(exitWithCode(ErrorCode.IO));
  const item = listItem(name);

  if (!homepage.includes(item)) {
    const regexString =
      '<ul id="ses-templates">(\\s*)(((\\s*)<li><a href="(.+)">(.+)<\\/a><\\/li>)*)';

    const searchValueMatch = homepage.match(regexString + '(\\s*)<\\/ul>');
    const searchValue = searchValueMatch && searchValueMatch.length ? searchValueMatch[0] : '';

    const templateMatch = homepage.match(new RegExp(regexString));
    const template = templateMatch && templateMatch.length ? templateMatch[0] : '';

    const replaceValue = `${template}\n${' '.repeat(8)}${item}\n${' '.repeat(6)}</ul>`;

    console.log(chalk.gray(`${name}: Adding to site index...`));

    await replaceIndex(searchValue, replaceValue);
  }
};
