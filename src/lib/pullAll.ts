import chalk from 'chalk';
import { pullOne } from './pullOne';
import { EError, exitWithCode, ErrorCode } from '../utils/error';
import { SesService } from '../services/ses.service';

export const pullAll = async (ses: SesService) => {
  const templates = await ses.listTemplates().catch(exitWithCode(ErrorCode.PROXY));
  const results = await Promise.all(templates.map((name) => pullOne(name, ses).catch((e) => e)));

  results.forEach(({ name, error }) => {
    if (error) {
      if (error.message !== EError.NOT_FOUND) {
        console.log(chalk.red(error));
      }
    } else {
      console.log(chalk.green(`${name}: Pulled from SES successfully!`));
    }
  });
};
