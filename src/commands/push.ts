import { Command } from 'commander';
import chalk from 'chalk';
import { pushOne } from '../lib/pushOne';
import { pushAll } from '../lib/pushAll';
import { ErrorCode, ErrorName } from '../utils/error';

export const push = (cli: Command) =>
  cli
    .command('push [name]')
    .description('push templates to SES')
    .action(async (name?: string) => {
      if (name) {
        const res = await pushOne(name);

        if (res.error) {
          const message = res.error.message as ErrorName;
          process.exit(ErrorCode[message]);
        } else {
          console.log(chalk.green(`${res.name}: Pushed to SES successfully!`));
        }
      } else {
        await pushAll();
      }
    });
