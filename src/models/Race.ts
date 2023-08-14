import { collectionQueries } from '@utils/helpers';
import mongoose from 'mongoose';
import type { BaseRace, RaceDocument, RaceModel } from 'types';

const { Schema } = mongoose;

interface RaceQuery {
  name?: string | RegExp;
  skip?: number;
}

const raceSchema = new Schema<RaceDocument, RaceModel>(
  {
    id: Number,
    name: String,
    homeland: String,
    about: String,
    image: String,
    url: String,
    created: String,
    last_updated: String
  },
  { versionKey: false }
);

raceSchema.statics.structure = (res) => {
  const sortSchema = ({ id, name, homeland, about, image, url, created, last_updated }: RaceDocument): BaseRace => ({
    // Besides order structure, it sets empty(null/undefined) not required properties to explicitly null
    id,
    name,
    homeland,
    about,
    image: image ?? null,
    url,
    created,
    last_updated
  });

  return Array.isArray(res) ? res.map(sortSchema) : sortSchema(res);
};

raceSchema.statics.findAndCount = async function ({ name, skip }) {
  const regex = (key: string): RegExp => new RegExp(key.replace(/[^\w\s]/g, '\\$&'), 'i');

  const query: RaceQuery = {};

  if (name != null) query.name = regex(name);

  const [data, count] = await Promise.all([
    this.find(query).sort({ id: 1 }).select(collectionQueries.exclude).limit(collectionQueries.limit).skip(skip),
    this.find(query).countDocuments()
  ]);

  const results = this.structure(data);

  return { results, count };
};

export default mongoose.model<RaceDocument, RaceModel>('Race', raceSchema);
