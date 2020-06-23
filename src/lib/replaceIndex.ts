import fs from 'fs';
import path from 'path';
import util from 'util';
import { PUBLIC_DIR } from '../utils/constants';
import { exitWithCode, ErrorCode } from '../utils/error';

/**
 * Search replace the `index.html` file.
 */
export const replaceIndex = async (searchValue: string | RegExp, replaceValue: string) => {
  const readFile = util.promisify(fs.readFile);
  const writeFile = util.promisify(fs.writeFile);
  const indexFile = path.join(PUBLIC_DIR, 'index.html');
  const homepage = await readFile(indexFile, 'utf8').catch(exitWithCode(ErrorCode.IO));
  const updatedHomepage = homepage.replace(searchValue, replaceValue);

  await writeFile(indexFile, updatedHomepage).catch(exitWithCode(ErrorCode.IO));
};
