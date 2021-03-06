import { Command } from 'commander';
import { VERSION } from './utils/constants';
import { SesService } from './services/ses.service';
import { start, list, create, push, pull, del } from './commands';

export type CliCommand = (cli: Command, ses: SesService) => void;

export class CliFactory {
  private program: Command;

  /**
   * Creates program instance and injects SES service into each command.
   *
   * @param sesService The SesService instance.
   */
  constructor(private sesService: SesService) {
    this.program = new Command() as Command;

    this.program.version(VERSION);

    const commands: CliCommand[] = [start, list, create, push, pull, del];

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
