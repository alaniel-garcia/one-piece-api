import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express, { type Handler } from 'express';
// import express from 'express';
import path from 'path';
import router from './routes';
import { notFound, productionErrors } from '@handlers/errors';

dotenv.config();

const db = process.env.NODE_ENV === 'development' ? process.env.MONGO_DB_DEV_URI : '';

function serveStaticImages(endpoint: string): Handler {
  return express.static(path.join(__dirname, 'images', endpoint));
}

(async () => {
  await mongoose.connect(db as string);
  console.log('Connected to Database!');

  const app = express();

  app.use(express.json());

  const PORT = process.env.PORT ?? 8080;
  app.listen(PORT);

  app.use('/api/characters/image', serveStaticImages('characters'));
  app.use('/api/devil_fruits/image', serveStaticImages('devil_fruits'));
  app.use('/api/haki_abilities/image', serveStaticImages('haki_abilities'));
  app.use('/api/races/image', serveStaticImages('races'));

  app.get('/', (_req, res) => {
    // res.send('One Piece API, Work in progress...');
    res.redirect('/api');
  });
  app.use('/api', router);

  app.use(notFound);
  app.use(productionErrors);
})().catch((error) => {
  console.log('Error while connecting to Database', error);
});
