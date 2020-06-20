import chalk from 'chalk';
import { listAll } from './listAll';
import { pullOne } from './pullOne';
import { EError } from '../utils/error';

export const pullAll = async () => {
  const templates = await listAll();
  const results = await Promise.all(templates.map((name) => pullOne(name).catch((e) => e)));

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
