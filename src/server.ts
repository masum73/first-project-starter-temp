import config from './app/config';
import mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`Example app is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// to start the server run the below command
// npm run start:dev

process.on('unhandledRejection', () => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
// Promise.reject();

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});

// console.log(x);
