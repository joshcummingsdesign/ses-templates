import { Command } from 'commander';
import { CliFactory } from './cli';
import sesService from './services/ses.service';

function bootstrap() {
  const cli = new CliFactory(new Command() as Command, sesService);
  cli.run();
}
bootstrap();
