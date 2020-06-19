const liveServer = require('live-server');

liveServer.start({
  port: process.env.PORT,
  host: 'localhost',
  root: 'src/public',
  open: true,
});
