import chalk from 'chalk';
import { findOne } from './findOne';
import { EError } from '../utils/error';
import { readTemplateFiles } from './readTemplateFiles';
import { SesService } from '../services/ses.service';

/**
 * Push a template to SES.
 */
export const pushOne = async (name: string, ses: SesService) => {
  const existing = await findOne(name, ses);
  const template = await readTemplateFiles(name);

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
