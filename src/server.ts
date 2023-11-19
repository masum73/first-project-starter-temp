import config from './app/config';
import mongoose from 'mongoose';
import app from './app';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Example app is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// to start the server run the below command
// npm run start:dev
