const liveServer = require('live-server');

module.exports = () => {
  liveServer.start({
    port: process.env.PORT,
    host: 'localhost',
    root: 'public',
    open: true,
  });
};
