const cli = require('yargs');
const serve = require('./scripts/start');
const push = require('./scripts/push');
const pull = require('./scripts/pull');

const getTemplateName = (yargs) =>
  yargs.positional('name', { describe: 'the template name', type: 'string' });

cli
  .scriptName('ses')
  .version('v1.0.0')
  .command('start', 'start the local development server', getTemplateName, serve)
  .command('push [name]', 'push a template to SES', getTemplateName, push)
  .command('pull [name]', 'pull a template from SES', getTemplateName, pull)
  .strict().argv;
