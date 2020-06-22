import { CliCommand } from '../interfaces';
import { exitWithCode, ErrorCode } from '../utils/error';

export const list: CliCommand = async (cli, ses) =>
  cli
    .command('list')
    .description('list all templates in SES')
    .action(async () => {
      const templates = await ses.listTemplates().catch(exitWithCode(ErrorCode.PROXY));
      templates.forEach((name) => console.log(name));
    });
