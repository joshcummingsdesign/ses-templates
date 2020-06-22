import util from 'util';
import path from 'path';
import rimraf from 'rimraf';
import req from 'supertest';
import liveServer from 'live-server';
import { exec, ExecException } from 'child_process';
import { serverParams } from '../src/commands/start';
import { spawnPublic } from '../src/lib/spawnPublic';
import { VERSION, PUBLIC_DIR } from '../src/utils/constants';

const run = (
  args: string[],
  callback: (error: ExecException | null, stdout: string, stderr: string) => void
) => {
  exec(`ts-node --transpile-only ${path.join(__dirname, 'run.ts')} ${args.join(' ')}`, callback);
};

describe('command line usage', () => {
  let request: req.SuperTest<req.Test>;

  beforeEach(async () => {
    const rm = util.promisify(rimraf);
    await rm(PUBLIC_DIR);
    await spawnPublic();
    liveServer.start({ ...serverParams, logLevel: 0 });
    request = req(`http://localhost:${serverParams.port}`);
  });

  afterEach(() => {
    liveServer.shutdown();
  });

  it('--version', (done) => {
    run(['--version'], (error, stdout) => {
      expect(error).toBeFalsy();
      expect(stdout.includes(VERSION)).toBeTruthy();
      done();
    });
  });

  it('--help', (done) => {
    run(['--help'], (error, stdout) => {
      expect(error).toBeFalsy();
      const commands = ['start', 'list', 'create', 'push', 'pull', 'delete'];
      commands.forEach((command) => {
        expect(stdout.includes(command)).toBeTruthy();
      });
      done();
    });
  });
});
