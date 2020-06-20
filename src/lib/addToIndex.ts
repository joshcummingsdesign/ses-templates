import fs from 'fs';
import path from 'path';
import util from 'util';
import chalk from 'chalk';
import { replaceIndex } from './replaceIndex';
import { listItem, templatePart } from '../templates';
import { PUBLIC_DIR } from '../utils/constants';
import { exitWithCode, ErrorCode } from '../utils/error';

export const addToIndex = async (name: string) => {
  const readFile = util.promisify(fs.readFile);
  const indexFile = path.join(PUBLIC_DIR, 'index.html');
  const homepage = await readFile(indexFile, 'utf8').catch(exitWithCode(ErrorCode.IO));
  const item = listItem(name);

  if (!homepage.includes(item)) {
    const spaces = ' '.repeat(8);
    const replaceValue = `${item}\n${spaces}${templatePart}`;

    console.log(chalk.gray(`${name}: Adding to site index...`));

    await replaceIndex(templatePart, replaceValue);
  }
};
