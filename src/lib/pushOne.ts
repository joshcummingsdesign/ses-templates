import chalk from 'chalk';
import { get } from './get';
import SES from '../ses';
import { EError } from '../utils/error';
import { read } from './read';

export const pushOne = async (name: string) => {
  const existing = await get(name);
  const template = await read(name);

  let error: Error | undefined;
  if (existing) {
    console.log(chalk.gray(`${name}: Updating template in SES...`));

    await SES.updateTemplate(template)
      .promise()
      .catch((err) => {
        console.log(chalk.red(err));
        error = new Error(EError.PROXY);
      });
  } else {
    console.log(chalk.gray(`${name}: Creating template in SES...`));

    await SES.createTemplate(template)
      .promise()
      .catch((err) => {
        console.log(chalk.red(err));
        error = new Error(EError.PROXY);
      });
  }

  return { name, error };
};
