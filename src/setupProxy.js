const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  console.log("proxy")
  app.use(
    '/api/',
    createProxyMiddleware({
      target: process.env.REACT_APP_REST_URL+'/dynamodbctrl',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug'
    })
  );
};