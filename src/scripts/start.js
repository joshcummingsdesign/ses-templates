const liveServer = require('live-server');

module.exports = () => {
  liveServer.start({
    port: process.env.PORT,
    host: 'localhost',
    root: 'src/public',
    open: true,
  });
};
