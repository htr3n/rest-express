import 'dotenv/config';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import logger from '../utils/logging';
import { initMockData } from './mock-data';

const isProduction =
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod';

(async () => {
  let server = null;

  if (!isProduction) {
    logger.info('Initializing in-memory MongoDB server');
    // Create an new instance of "MongoMemoryServer" and automatically start it
    server = await MongoMemoryServer.create();
    if (server) {
      logger.info(`... MongoDB server is running at '${server.getUri()}'`);
    }
  }

  if (isProduction) {
    const uri = process.env.DB_URI ?? '';
    logger.info(`Connecting to MongoDB at '${uri}'`);
    await mongoose.connect(uri);
  } else {
    if (server) {
      logger.info('Connecting to in-memory MongoDB server');
      await mongoose.connect(server.getUri());
      initMockData();
    }
  }
})();
