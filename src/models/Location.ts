import mongoose from 'mongoose';
import type { BaseLocation, LocationDocument, LocationModel } from 'types';

const { Schema } = mongoose;

const locationSchema = new Schema<LocationDocument, LocationModel>(
  {
    id: Number,
    name: String,
    type: String,
    description: String,
    population: String,
    government: String,
    history: String,
    image: String,
    url: String,
    created: String,
    last_updated: String
  },
  { versionKey: false }
);

locationSchema.statics.structure = (res) => {
  const sortSchema = ({
    id,
    name,
    type,
    description,
    population,
    government,
    history,
    image,
    url,
    created,
    last_updated
  }: LocationDocument): BaseLocation => ({
    id,
    name,
    type,
    description,
    population,
    government,
    history,
    image,
    url,
    created,
    last_updated
  });

  locationSchema.statics.findAndCount = async () => {
    // implement code after

    const results = '';
    const count = 0;

    return { results, count };
  };

  return Array.isArray(res) ? res.map(sortSchema) : sortSchema(res);
};

export default mongoose.model<LocationDocument, LocationModel>('Location', locationSchema);
