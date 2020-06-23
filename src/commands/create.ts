import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { CliCommand } from '../cli';
import { findOne } from '../lib/findOne';
import { writeTemplateFiles } from '../lib/writeTemplateFiles';
import { addToIndex } from '../lib/addToIndex';
import { spawnPublic } from '../lib/spawnPublic';
import { subjectTemplate, htmlTemplate, textTemplate } from '../templates';
import { PUBLIC_DIR } from '../utils/constants';
import { ErrorCode } from '../utils/error';

export const create: CliCommand = (cli, ses) =>
  cli
    .command('create <name>')
    .description('create a new template')
    .action(async (name: string) => {
      await spawnPublic();

      const existing = await findOne(name, ses);
      const dir = path.join(PUBLIC_DIR, name);

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

      await writeTemplateFiles({ name, template });

      await addToIndex(name);

      console.log(chalk.green(`${name}: Template created successfully!`));
    });
