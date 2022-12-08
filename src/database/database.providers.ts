import * as mongoose from "mongoose";
require('dotenv').config()

export const databaseProviders = [
  {
    provide: "DATABASE_CONNECTION",
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(process.env.MongoURI)
  }
];
