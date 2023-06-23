import mongoose, { ConnectOptions } from 'mongoose';

const connectOpts: ConnectOptions = {
  autoCreate: true,
  dbName: 'mongodb-user-rest-api'
};

const connect = async (uri: string) => {
  return await mongoose.connect(uri, connectOpts);
};

export { connect };
