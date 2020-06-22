import { CliFactory } from './cli';
import { SesService } from './services/ses.service';

function bootstrap() {
  const cli = new CliFactory(new SesService());
  cli.init();
}
bootstrap();
