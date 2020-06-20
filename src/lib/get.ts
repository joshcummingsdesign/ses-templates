import chalk from 'chalk';
import SES from '../ses';
import { ErrorCode } from '../utils/error';

export const get = async (name: string) => {
  console.log(chalk.gray(`${name}: Checking for template in SES...`));

  const template = await SES.getTemplate({ TemplateName: name })
    .promise()
    .then((res) => {
      console.log(chalk.grey(`${name}: Template found in SES`));
      return res.Template;
    })
    .catch((error) => {
      if (error.message.includes('does not exist')) {
        console.log(chalk.grey(`${name}: Template not found in SES`));
      } else {
        console.log(chalk.red(error));
        process.exit(ErrorCode.PROXY);
      }
    });

  return template || undefined;
};