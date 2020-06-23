import liveServer from 'live-server';
import config from '../config';
import { CliCommand } from '../cli';
import { spawnPublic } from '../lib/spawnPublic';

export const serverParams = {
  port: Number(config.port),
  host: 'localhost',
  root: 'public',
  open: process.env.NODE_ENV !== 'test',
};

export const start: CliCommand = (cli) =>
  cli
    .command('start')
    .description('start the local development server')
    .action(async () => {
      await spawnPublic();
      liveServer.start(serverParams);
    });
