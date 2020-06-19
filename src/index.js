const cli = require('yargs');
const create = require('./scripts/create');
const push = require('./scripts/push');
const pull = require('./scripts/pull');

const getTemplateName = (yargs) =>
  yargs.positional('name', { describe: 'the template name', type: 'string' });

cli
  .scriptName('ses')
  .version('v1.0.0')
  .command('create [name]', 'create a new template', getTemplateName, create)
  .command('push [name]', 'push a template to SES', getTemplateName, push)
  .command('pull [name]', 'pull a template from SES', getTemplateName, pull)
  .strict().argv;
