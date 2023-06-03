import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const connectDB = async () => {
  const server = await MongoMemoryServer.create();
  const url = server.getUri();
  return await mongoose.connect(url);
};

module.exports = connectDB;
