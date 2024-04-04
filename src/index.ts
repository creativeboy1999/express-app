import { Server } from 'http';
import { ENV } from './common/config';
import app from './domain/server';
import { mongoDataBase } from './db/mongo/connect.db';
import { redisDatabaseInstance } from './db/redis/connection';

let server: Server;
let status: 'online' | 'offline' | 'starting' | 'stopping' = 'offline';

async function runServer() {
  status = 'online';

  let err = await mongoDataBase.initialize();
  if (err) {
    console.log(err, 'mongo db connection error');
    return err; // graceFullShutdown(err)
  }
  console.log('success connect: mongodb ');

  err = await redisDatabaseInstance.initialize();
  if (err) {
    console.log(err, 'error while connect redis');
    return err; // graceFullShutdown(err)
  }
  console.log('success connect: Redis ');

  server = app.listen(ENV.HTTP_PORT, ENV.HTTP_HOST);
  console.log(`Server running. ${ENV.HTTP_HOST}:${ENV.HTTP_PORT}`);
  server.on('close', () => {
    console.log(`server.on('close') => the express server is down. status: ${status}`);
  });
}

async function gracefulShutDown(reason: string) {
  let err;
  console.log(`reason: ${reason}. status: ${status}`);

  if (status !== 'online') return;

  status = 'stopping';

  // close server
  server?.close((err) => {
    if (err) console.log(err, 'error while stop express server');
    else console.log(`the express server is down. status: ${status}`);
  });

  await new Promise((resolve) => {
    if (server)
      server.on('close', () => {
        resolve('OK');
      });
    else resolve('OK');
  });

  // close connection with redis
  err = await redisDatabaseInstance.closeConnection();
  if (err) {
    console.log(err, 'error while redisDatabaseInstance.closeConnection()');
  }

  // close connection with postgres
  err = await mongoDataBase.closeConnection();
  if (err) {
    console.log(err, 'error while mongoDataBase.closeConnection()');
  }

  status = 'offline';
  console.log(`the server is down. status: ${status}`);
  process.exit(1); // dblar o'chmasdan qilmaslik krk
}

function onErrorHandler(err: Error, reason: string) {
  console.log(err, reason);

  if (gracefulShutDown) gracefulShutDown(reason);
}

function initNodeJSEventHandlers() {
  // Enable graceful stop
  process.on('beforeExit', (code) => {
    console.log('Process beforeExit event with code: ', code);
  });

  // process.on("rejectionHandled", (err: Error) =>
  //   onErrorHandler(err, "rejectionHandled"),
  // );
  // process.on("uncaughtException", (err: Error) =>
  //   onErrorHandler(err, "uncaughtException"),
  // );
  // process.on("unhandledRejection", (err: Error) =>
  //   onErrorHandler(err, "unhandledRejection"),
  // );
  // process.on("uncaughtExceptionMonitor", (err: Error) =>
  //   onErrorHandler(err, "uncaughtExceptionMonitor"),
  // );
  process.on('SIGINT', (err: Error) => onErrorHandler(err, 'SIGINT'));
  process.on('SIGTERM', (err: Error) => onErrorHandler(err, 'SIGTERM'));
}

initNodeJSEventHandlers();
runServer();
