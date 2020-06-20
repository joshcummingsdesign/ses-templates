import fs from 'fs';
import util from 'util';
import chalk from 'chalk';
import { SES } from 'aws-sdk';
import { PUBLIC_DIR } from '../utils/constants';
import { exitWithCode, ErrorCode } from '../utils/error';

export const write = async ({ name, template }: { name: string; template: SES.Template }) => {
  const writeFile = util.promisify(fs.writeFile);
  const dir = `${PUBLIC_DIR}/${name}`;
  const { HtmlPart, TextPart, SubjectPart } = template;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  console.log(chalk.gray(`${name}: Writing template files...`));

  await writeFile(`${dir}/index.html`, HtmlPart!).catch(exitWithCode(ErrorCode.IO));
  await writeFile(`${dir}/index.txt`, TextPart!).catch(exitWithCode(ErrorCode.IO));
  await writeFile(`${dir}/template.json`, JSON.stringify({ subject: SubjectPart! })).catch(
    exitWithCode(ErrorCode.IO)
  );
};
