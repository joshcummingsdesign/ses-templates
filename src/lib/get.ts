import chalk from 'chalk';
import { ErrorCode } from '../utils/error';
import { SesService } from '../services/ses.service';

export const get = async (name: string, ses: SesService) => {
  console.log(chalk.gray(`${name}: Checking for template in SES...`));
  try {
    return await ses.getTemplate(name);
  } catch (error) {
    if (error.message.includes('does not exist')) {
      console.log(chalk.grey(`${name}: Template not found in SES`));
    } else {
      console.log(chalk.red(error));
      process.exit(ErrorCode.PROXY);
    }
  }
};
