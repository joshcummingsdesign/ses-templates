import fs from 'fs';
import path from 'path';
import util from 'util';
import chalk from 'chalk';
import { SES } from 'aws-sdk';
import { PUBLIC_DIR } from '../utils/constants';
import { exitWithCode, ErrorCode } from '../utils/error';

/**
 * Read template file partials and return a template object.
 */
export const readTemplateFiles = async (name: string): Promise<SES.CreateTemplateRequest> => {
  const readFile = util.promisify(fs.readFile);
  const dir = path.join(PUBLIC_DIR, name);
  const htmlFile = path.join(dir, 'index.html');
  const textFile = path.join(dir, 'index.txt');
  const templateFile = path.join(dir, 'template.json');

  console.log(chalk.gray(`${name}: Reading template files...`));
  const HtmlPart = await readFile(htmlFile, 'utf8').catch(exitWithCode(ErrorCode.IO));
  const TextPart = await readFile(textFile, 'utf8').catch(exitWithCode(ErrorCode.IO));
  const SubjectPart = await readFile(templateFile, 'utf8')
    .then((res) => JSON.parse(res).subject as string)
    .catch(exitWithCode(ErrorCode.IO));

  return {
    Template: {
      TemplateName: name,
      SubjectPart,
      HtmlPart,
      TextPart,
    },
  };
};
