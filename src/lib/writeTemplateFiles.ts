import fs from 'fs';
import path from 'path';
import util from 'util';
import chalk from 'chalk';
import { SES } from 'aws-sdk';
import { PUBLIC_DIR } from '../utils/constants';
import { exitWithCode, ErrorCode } from '../utils/error';

/**
 * Write template file partials via a template object.
 */
export const writeTemplateFiles = async ({
  name,
  template,
}: {
  name: string;
  template: SES.Template;
}) => {
  const writeFile = util.promisify(fs.writeFile);
  const dir = path.join(PUBLIC_DIR, name);
  const htmlFile = path.join(dir, 'index.html');
  const textFile = path.join(dir, 'index.txt');
  const templateFile = path.join(dir, 'template.json');
  const { HtmlPart, TextPart, SubjectPart } = template;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  console.log(chalk.gray(`${name}: Writing template files...`));

  await writeFile(htmlFile, HtmlPart!).catch(exitWithCode(ErrorCode.IO));
  await writeFile(textFile, TextPart!).catch(exitWithCode(ErrorCode.IO));
  await writeFile(templateFile, JSON.stringify({ subject: SubjectPart! })).catch(
    exitWithCode(ErrorCode.IO)
  );
};
