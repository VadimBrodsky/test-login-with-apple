'use strict';
let Path = require('path');
let Hapi = require('@hapi/hapi');
let Hoek = require('@hapi/hoek');

let init = async () => {
  let server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  await server.register(require('@hapi/vision'));

  server.views({
    engines: {
      html: {
        module: require('handlebars'),
        compileMode: 'sync',
        isCached: process.env.NODE_ENV === 'production',
      },
    },
    layout: 'default',
    layoutPath: 'templates/layouts',
    path: 'templates',
    relativeTo: __dirname,
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h.view('index', { title: 'Homepage' });
    },
  });

  await server.start();
  console.log('Server is running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit();
});

init();
