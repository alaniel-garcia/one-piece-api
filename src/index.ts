import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import router from './routes';

dotenv.config();

const db = process.env.NODE_ENV === 'development' ? process.env.MONGO_DB_DEV_URI : '';

(async () => {
  await mongoose.connect(db as string);
  console.log('Connected to Database!');

  const app = express();

  app.use(express.json());

  const PORT = process.env.PORT ?? 8080;
  app.listen(PORT);

  app.get('/', (_req, res) => {
    res.send('One Piece API, Work in progress...');
  });
  app.use('/api', router);
})().catch((error) => {
  console.log('Error while connecting to Database', error);
});
