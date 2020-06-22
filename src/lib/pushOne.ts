import chalk from 'chalk';
import { get } from './get';
import { EError } from '../utils/error';
import { read } from './read';
import { SesService } from '../services/ses.service';

export const pushOne = async (name: string, ses: SesService) => {
  const existing = await get(name, ses);
  const template = await read(name);

  let error: Error | undefined;
  if (existing) {
    console.log(chalk.gray(`${name}: Updating template in SES...`));

    await ses.updateTemplate(template).catch((err) => {
      console.log(chalk.red(err));
      error = new Error(EError.PROXY);
    });
  } else {
    console.log(chalk.gray(`${name}: Creating template in SES...`));

    await ses.createTemplate(template).catch((err) => {
      console.log(chalk.red(err));
      error = new Error(EError.PROXY);
    });
  }

  return { name, error };
};
