'use strict';
let Hapi = require('@hapi/hapi');

let init = async () => {
  let server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  await server.start();
  console.log('Server is running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit();
});

init();
