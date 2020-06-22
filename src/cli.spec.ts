import util from 'util';
import path from 'path';
import rimraf from 'rimraf';
import request from 'supertest';
import liveServer from 'live-server';
import { execFile, ExecException, ExecFileOptions } from 'child_process';
import { serverOptions } from '../src/commands/start';
import { spawnPublic } from './lib/spawnPublic';
import { VERSION, PUBLIC_DIR } from '../src/utils/constants';

const testServerParams = { ...serverOptions, logLevel: 0 };

const exec = (
  args: string[],
  callback: (error: ExecException | null, stdout: string, stderr: string) => void
) => {
  const cmd = path.join(__dirname, '..', 'bin', 'ses-templates');
  const opts: ExecFileOptions = { timeout: 2000, maxBuffer: 1024 };
  execFile(cmd, args, opts, callback);
};

describe('command line usage', () => {
  beforeEach(async () => {
    const rm = util.promisify(rimraf);
    await rm(PUBLIC_DIR);
    await spawnPublic();
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
    liveServer.start(testServerParams);
    await request('http://localhost:8081').get('/').expect(200);
    liveServer.shutdown();
  });
});
