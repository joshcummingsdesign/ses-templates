import { Command } from 'commander';
import liveServer from 'live-server';
import config from '../config';

/**
 * Start the local development server.
 */
export const start = (cli: Command) =>
  cli
    .command('start')
    .description('start the local development server')
    .action(() =>
      liveServer.start({
        port: Number(config.port),
        host: 'localhost',
        root: 'public',
        open: true,
      })
    );
