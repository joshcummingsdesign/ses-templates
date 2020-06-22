import fs from 'fs';
import util from 'util';
import chalk from 'chalk';
import { PUBLIC_DIR } from '../utils/constants';
import { exitWithCode, ErrorCode } from '../utils/error';
import { pushOne } from './pushOne';
import { SesService } from '../services/ses.service';

export const pushAll = async (ses: SesService) => {
  const readdir = util.promisify(fs.readdir);

  const directories = await readdir(PUBLIC_DIR, { withFileTypes: true }).catch(
    exitWithCode(ErrorCode.IO)
  );

  const templates = directories.filter((dirent) => dirent.isDirectory()).map((dir) => dir.name);

  const results = await Promise.all(templates.map((t) => pushOne(t, ses).catch((e) => e)));

  results.forEach(({ name, error }) => {
    if (error) {
      console.log(chalk.red(error));
    } else {
      console.log(chalk.green(`${name}: Pushed to SES successfully!`));
    }
  });
};
