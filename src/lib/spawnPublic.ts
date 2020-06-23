import fs from 'fs';
import path from 'path';
import util from 'util';
import ncp from 'ncp';
import { PUBLIC_DIR } from '../utils/constants';
import { exitWithCode, ErrorCode } from '../utils/error';

/**
 * Create a new public directory if there isn't one already.
 */
export const spawnPublic = async () => {
  const cp = util.promisify(ncp);
  const dir = path.join(__dirname, '..', 'templates', 'public');

  if (!fs.existsSync(PUBLIC_DIR)) {
    await cp(dir, `${PUBLIC_DIR}`).catch(exitWithCode(ErrorCode.IO));
  }
};
