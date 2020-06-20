import fs from 'fs';
import util from 'util';
import { PUBLIC_DIR } from '../utils/constants';
import { exitWithCode, ErrorCode } from '../utils/error';

export const replaceIndex = async (searchValue: string, replaceValue: string) => {
  const readFile = util.promisify(fs.readFile);
  const writeFile = util.promisify(fs.writeFile);
  const indexFile = `${PUBLIC_DIR}/index.html`;
  const homepage = await readFile(indexFile, 'utf8').catch(exitWithCode(ErrorCode.IO));
  const updatedHomepage = homepage.replace(searchValue, replaceValue);

  await writeFile(indexFile, updatedHomepage).catch(exitWithCode(ErrorCode.IO));
};