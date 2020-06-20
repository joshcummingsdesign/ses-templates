import chalk from 'chalk';
import { listItem } from '../templates';
import { replaceIndex } from './replaceIndex';

export const removeFromIndex = async (name: string) => {
  const spaces = ' '.repeat(8);
  const searchValue = `${spaces}${listItem(name)}\n`;

  console.log(chalk.gray(`${name}: Removing from site index...`));

  await replaceIndex(searchValue, '');
};
