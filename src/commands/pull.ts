import { Command } from 'commander';
import chalk from 'chalk';
import { pullOne } from '../lib/pullOne';
import { pullAll } from '../lib/pullAll';
import { ErrorCode, ErrorName } from '../utils/error';

export const pull = (cli: Command) =>
  cli
    .command('pull [name]')
    .description('pull templates from SES')
    .action(async (name?: string) => {
      if (name) {
        const res = await pullOne(name);

        if (res.error) {
          const message = res.error.message as ErrorName;
          process.exit(ErrorCode[message]);
        } else {
          console.log(chalk.green(`${res.name}: Pulled from SES successfully!`));
        }
      } else {
        await pullAll();
      }
    });
