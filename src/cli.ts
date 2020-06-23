import { Command } from 'commander';
import { VERSION } from './utils/constants';
import { SesService } from './services/ses.service';
import { start, list, create, push, pull, del } from './commands';

export class CliFactory {
  /**
   * Injects the program and SES service into each command.
   *
   * @param program The commander Command instance.
   * @param sesService The SesService instance.
   */
  constructor(private program: Command, private sesService: SesService) {
    program.version(VERSION);

    const commands = [start, list, create, push, pull, del];

    commands.forEach((command) => {
      command(this.program, this.sesService);
    });
  }

  /**
   * Run a command or begin parsing argv.
   *
   * @param cmd The command to run. If undefined, will parse argv.
   */
  async run(cmd?: string): Promise<Command> {
    return this.program.parseAsync(cmd ? cmd.split(' ') : process.argv);
  }
}
