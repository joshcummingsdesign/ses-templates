import util from 'util';
import path from 'path';
import rimraf from 'rimraf';
import req from 'supertest';
import liveServer from 'live-server';
import { execFile, ExecException, ExecFileOptions } from 'child_process';
import { serverParams } from '../src/commands/start';
import { spawnPublic } from './lib/spawnPublic';
import { VERSION, PUBLIC_DIR } from '../src/utils/constants';

const exec = (
  args: string[],
  callback: (error: ExecException | null, stdout: string, stderr: string) => void
) => {
  const cmd = path.join(__dirname, '..', 'bin', 'ses-templates');
  const opts: ExecFileOptions = { timeout: 2000, maxBuffer: 1024 };
  execFile(cmd, args, opts, callback);
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
    exec(['--version'], (error, stdout) => {
      expect(error).toBeFalsy();
      expect(stdout.includes(VERSION)).toBeTruthy();
      done();
    });
  });

  it('--help', (done) => {
    exec(['--help'], (error, stdout) => {
      expect(error).toBeFalsy();
      const commands = ['start', 'list', 'create', 'push', 'pull', 'delete'];
      commands.forEach((command) => {
        expect(stdout.includes(command)).toBeTruthy();
      });
      done();
    });
  });

  it('create', async () => {
    await request.get('/');
  });
});
