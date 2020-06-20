import { Command } from 'commander';
import fs from 'fs';
import chalk from 'chalk';
import { get } from '../lib/get';
import { write } from '../lib/write';
import { addToIndex } from '../lib/addToIndex';
import { spawnPublic } from '../lib/spawnPublic';
import { subjectTemplate, htmlTemplate, textTemplate } from '../templates';
import { PUBLIC_DIR } from '../utils/constants';
import { ErrorCode } from '../utils/error';

export const create = (cli: Command) =>
  cli
    .command('create <name>')
    .description('create a new template')
    .action(async (name: string) => {
      const existing = await get(name);
      const dir = `${PUBLIC_DIR}/${name}`;

      await spawnPublic();

      if (existing || fs.existsSync(dir)) {
        console.log(chalk.red(`${name}: Template already exists`));
        process.exit(ErrorCode.CONFLICT);
      } else {
        fs.mkdirSync(dir);
      }

      console.log(chalk.gray(`${name}: Creating template...`));

      const template = {
        TemplateName: name,
        SubjectPart: subjectTemplate,
        HtmlPart: htmlTemplate,
        TextPart: textTemplate,
      };

      await write({ name, template });

      await addToIndex(name);

      console.log(chalk.green(`${name}: Template created successfully!`));
    });
