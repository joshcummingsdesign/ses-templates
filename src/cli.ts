import { Command } from 'commander';
import { VERSION } from './utils/constants';
import { SesService } from './services/ses.service';
import { CliCommand } from './interfaces';
import { start, list, create, push, pull, del } from './commands';

export class CliFactory {
  private cli: Command;
  private commands: CliCommand[];

  constructor(private sesService: SesService) {
    this.cli = new Command().version(VERSION) as Command;
    this.commands = [start, list, create, push, pull, del];
  }

  /**
   * Inject the cli object and sesService into each command and parse argv.
   */
  init(): void {
    this.commands.forEach((command) => {
      command(this.cli, this.sesService);
    });

    this.cli.parse(process.argv);
  }
}
