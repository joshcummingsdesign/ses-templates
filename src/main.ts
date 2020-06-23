import { CliFactory } from './cli';
import sesService from './services/ses.service';

function bootstrap() {
  const cli = new CliFactory(sesService);
  cli.run();
}
bootstrap();
