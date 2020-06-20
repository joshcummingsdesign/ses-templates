import { Command } from 'commander';
import { VERSION } from './utils/constants';

export class CLI {
  /**
   * CLI constructor.
   * @param commands An array of of commands.
   */
  constructor(private commands: Function[]) {}

  /**
   * Inject the cli object into each command and parse argv.
   */
  init(): void {
    const cli = new Command().version(VERSION);

    this.commands.forEach((command) => {
      command(cli);
    });

    cli.parse(process.argv);
  }
}
