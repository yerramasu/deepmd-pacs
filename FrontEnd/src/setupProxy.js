/**
MIT License
Copyright (c) 2021 KANOUN Salim - OLIVIE Emilie
 */

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://35.202.115.123:4000',
      changeOrigin: false,
    })
  );

  app.use(
    '/viewer-stone',
    createProxyMiddleware({
      target: 'http://35.202.115.123:4000',
      changeOrigin: false,
    })
  );

  app.use(
    '/viewer-ohif',
    createProxyMiddleware({
      target: 'http://35.202.115.123:4000',
      changeOrigin: false,
    })
  );

  
};