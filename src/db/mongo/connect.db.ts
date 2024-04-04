import mongoose from 'mongoose';
import { ENV } from '../../common/config';
import { IMongoDataBase } from './mongo.interface';

export class MongoDataBase implements IMongoDataBase {
  async initialize(): Promise<Error | null> {
    return await mongoose
      .connect(ENV.DB.MONGODB.URL, {
        dbName: ENV.DB.MONGODB.DATABASE_NAME,
      })
      .then(() => null)
      .catch((err) => {
        return err;
      });
  }

  async closeConnection(): Promise<Error | null> {
    await mongoose.disconnect();
    return null;
  }
}

export const mongoDataBase = new MongoDataBase();
