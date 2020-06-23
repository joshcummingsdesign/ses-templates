import fs from 'fs';
import path from 'path';
import util from 'util';
import rimraf from 'rimraf';
import chalk from 'chalk';
import { CliCommand } from '../cli';
import { findOne } from '../lib/findOne';
import { removeFromIndex } from '../lib/removeFromIndex';
import { PUBLIC_DIR } from '../utils/constants';
import { exitWithCode, ErrorCode } from '../utils/error';

export const del: CliCommand = async (cli, ses) =>
  cli
    .command('delete <name>')
    .description('delete a template from SES')
    .action(async (name: string) => {
      const rm = util.promisify(rimraf);
      const existing = await findOne(name, ses);
      const dir = path.join(PUBLIC_DIR, name);

      if (fs.existsSync(PUBLIC_DIR)) {
        console.log(chalk.gray(`${name}: Removing directory...`));
        await rm(dir).catch(exitWithCode(ErrorCode.IO));
        await removeFromIndex(name);
      }

      if (!existing) {
        console.log(`${name}: Template not found in SES`);
      } else {
        await ses.deleteTemplate(name).catch(exitWithCode(ErrorCode.PROXY));
        console.log(chalk.green(`${name}: Template deleted successfully!`));
      }
    });
