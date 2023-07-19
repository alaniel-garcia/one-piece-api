import mongoose from 'mongoose';
import type { BaseRace, RaceDocument, RaceModel } from 'types';

const { Schema } = mongoose;

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
    id,
    name,
    homeland,
    about,
    image,
    url,
    created,
    last_updated
  });

  return Array.isArray(res) ? res.map(sortSchema) : sortSchema(res);
};

raceSchema.statics.findAndCount = async () => {
  // implement code after

  const results = '';
  const count = 0;

  return { results, count };
};

export default mongoose.model<RaceDocument, RaceModel>('Race', raceSchema);
