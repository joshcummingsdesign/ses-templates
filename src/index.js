const cli = require('yargs');
const start = require('./lib/start');
const list = require('./lib/list');
const create = require('./lib/create');
const push = require('./lib/push');
const pull = require('./lib/pull');
const del = require('./lib/del');

const buildName = (yargs) =>
  yargs.positional('name', {
    describe: 'template name',
    type: 'string',
  });

cli
  .scriptName('ses')
  .version('v1.0.0')
  .command('start', 'start the local development server', start)
  .command('list', 'list all templates in ses', list)
  .command('create <name>', 'create a new template', buildName, create)
  .command('push [name]', 'push templates to SES', buildName, push)
  .command('pull [name]', 'pull templates from SES', buildName, pull)
  .command('delete <name>', 'delete a template from SES', buildName, del)
  .demandCommand(1)
  .strict().argv;
