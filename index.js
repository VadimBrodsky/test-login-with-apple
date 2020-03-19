'use strict';
let Path = require('path');
let Hapi = require('@hapi/hapi');
let Hoek = require('@hapi/hoek');
let { NODE_ENV, PORT } = process.env;

const isProduction = NODE_ENV === 'production';

let init = async () => {
  let server = Hapi.server({
    port: Number.parseInt(PORT) || 3000,
    host: '0.0.0.0',
  });

  await server.register(require('@hapi/vision'));

  server.views({
    engines: {
      html: {
        module: require('handlebars'),
        compileMode: 'sync',
        isCached: isProduction,
      },
    },
    layout: 'default',
    layoutPath: 'templates/layouts',
    path: 'templates',
    relativeTo: __dirname,
  });

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return h.view('index', { title: 'Homepage' });
      },
    },
    {
      method: 'POST',
      path: '/confirm',
      handler: (request, h) => {
        console.log(request.payload);
        return { status: 200 };
      },
    },
  ]);

  await server.start();
  console.log('Server is running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit();
});

init();
