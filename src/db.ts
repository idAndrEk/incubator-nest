import mongoose from 'mongoose';

export async function runDb() {
  try {
    await mongoose.connect(process.env.MongoURI, { dbName: 'incubator-nest' });
    console.log('Connected successfully to mongo server');
  } catch {
    console.log('Cant`t connect to db!');
    await mongoose.disconnect();
  }
}
