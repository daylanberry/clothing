const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/api/**', {
    target: 'http://localhost:5002'
  }));

  app.use(proxy('/socket.io/', {
    target: 'ws://localhost:5002',
    changeOrigin: true,
    ws: true
  }));



};