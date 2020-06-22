import { CliFactory } from '../src/cli';
import { SesService } from '../src/services/ses.service';

function bootstrap() {
  const cli = new CliFactory(new SesService());
  cli.init();
}
bootstrap();
