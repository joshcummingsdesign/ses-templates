import path from 'path';
import { execFile, ExecException, ExecFileOptions } from 'child_process';
import { VERSION } from '../src/utils/constants';

const exec = (
  args: string[],
  callback: (error: ExecException | null, stdout: string, stderr: string) => void
) => {
  const cmd = path.join(__dirname, '..', 'bin', 'ses-templates');
  const opts: ExecFileOptions = { timeout: 2000, maxBuffer: 1024 };
  execFile(cmd, args, opts, callback);
};

describe('command line usage', () => {
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
});
