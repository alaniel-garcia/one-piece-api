import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoTestServer: MongoMemoryServer;

export async function setUp(): Promise<void> {
  mongoTestServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoTestServer.getUri());
}

export async function tearDown(): Promise<void> {
  await mongoose.disconnect();
  await mongoTestServer.stop();
}
