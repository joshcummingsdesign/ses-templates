import { Command } from 'commander';
import { listAll } from '../lib/listAll';

export const list = async (cli: Command) =>
  cli
    .command('list')
    .description('list all templates in SES')
    .action(async () => {
      const templates = await listAll();
      templates.forEach((name) => console.log(name));
    });
