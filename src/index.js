const cli = require('yargs');
const start = require('./scripts/start');
const list = require('./scripts/list');
const create = require('./scripts/create');
const push = require('./scripts/push');
const pull = require('./scripts/pull');
const del = require('./scripts/del');

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
