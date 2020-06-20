import { CLI } from './cli';
import { start } from './commands/start';
import { list } from './commands/list';
import { create } from './commands/create';
import { push } from './commands/push';
import { pull } from './commands/pull';
import { del } from './commands/del';

function bootstrap() {
  const cli = new CLI([start, list, create, push, pull, del]);
  cli.init();
}
bootstrap();
