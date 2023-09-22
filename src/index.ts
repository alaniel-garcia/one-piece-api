/* eslint-disable @typescript-eslint/no-floating-promises */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express, { type Handler } from 'express';
// import express from 'express';
import path from 'path';
import router from './routes';
import { notFound, productionErrors } from '@handlers/errors';

dotenv.config();

const db = process.env.MONGO_DB_PROD_ATLAS_URI ?? '';
function serveStaticImages(endpoint: string): Handler {
  return express.static(path.join(__dirname, 'public/images', endpoint));
}

mongoose.connect(db);
mongoose.connection.on('error', (err) => {
  console.log('Failed to connect to database: ', err);
});
mongoose.connection.once('open', () => {
  console.log('Connected to database...');
});

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
