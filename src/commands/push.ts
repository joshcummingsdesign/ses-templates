import chalk from 'chalk';
import { CliCommand } from '../cli';
import { pushOne } from '../lib/pushOne';
import { pushAll } from '../lib/pushAll';
import { ErrorCode, ErrorName } from '../utils/error';

export const push: CliCommand = (cli, ses) =>
  cli
    .command('push [name]')
    .description('push templates to SES')
    .action(async (name?: string) => {
      if (name) {
        const res = await pushOne(name, ses);

        if (res.error) {
          const message = res.error.message as ErrorName;
          process.exit(ErrorCode[message]);
        } else {
          console.log(chalk.green(`${res.name}: Pushed to SES successfully!`));
        }
      } else {
        await pushAll(ses);
      }
    });
