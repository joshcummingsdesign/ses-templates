import fs from 'fs';
import util from 'util';
import ncp from 'ncp';
import { PUBLIC_DIR } from '../utils/constants';
import { exitWithCode, ErrorCode } from '../utils/error';

export const spawnPublic = async () => {
  const cp = util.promisify(ncp);

  if (!fs.existsSync(PUBLIC_DIR)) {
    await cp(`${__dirname}/../templates/public`, PUBLIC_DIR).catch(exitWithCode(ErrorCode.IO));
  }
};
