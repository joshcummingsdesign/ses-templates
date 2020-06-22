import chalk from 'chalk';
import { CliCommand } from '../interfaces';
import { spawnPublic } from '../lib/spawnPublic';
import { pullOne } from '../lib/pullOne';
import { pullAll } from '../lib/pullAll';
import { ErrorCode, ErrorName } from '../utils/error';

export const pull: CliCommand = (cli, ses) =>
  cli
    .command('pull [name]')
    .description('pull templates from SES')
    .action(async (name?: string) => {
      await spawnPublic();

      if (name) {
        const res = await pullOne(name, ses);

        if (res.error) {
          const message = res.error.message as ErrorName;
          process.exit(ErrorCode[message]);
        } else {
          console.log(chalk.green(`${res.name}: Pulled from SES successfully!`));
        }
      } else {
        await pullAll(ses);
      }
    });
