import fs from 'fs';
import util from 'util';
import chalk from 'chalk';
import { SES } from 'aws-sdk';
import { PUBLIC_DIR } from '../utils/constants';
import { exitWithCode, ErrorCode } from '../utils/error';

export const read = async (name: string): Promise<SES.CreateTemplateRequest> => {
  const readFile = util.promisify(fs.readFile);
  const dir = `${PUBLIC_DIR}/${name}`;

  console.log(chalk.gray(`${name}: Reading template files...`));
  const HtmlPart = await readFile(`${dir}/index.html`, 'utf8').catch(exitWithCode(ErrorCode.IO));
  const TextPart = await readFile(`${dir}/index.txt`, 'utf8').catch(exitWithCode(ErrorCode.IO));
  const SubjectPart = await readFile(`${dir}/template.json`, 'utf8')
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
