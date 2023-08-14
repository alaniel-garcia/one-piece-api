import { collectionQueries, getPopulationSettings } from '@utils/helpers';
import mongoose from 'mongoose';
import type { BaseDevilFruit, DevilFruitDocument, DevilFruitModel } from 'types';

const { Schema } = mongoose;

interface DevilFruitQuery {
  name?: string | RegExp;
  type?: string | RegExp;
  skip?: number;
}

const devilFruitSchema = new Schema<DevilFruitDocument, DevilFruitModel>(
  {
    id: Number,
    name: String,
    alias: {
      $type: String,
      enum: ['Gomu Gomu no Mi']
    },
    type: {
      $type: String,
      enum: ['Paramecia', 'Logia', 'Zoan', 'Mythical Zoan']
    },
    meaning: String,
    description: String,
    current_user: {
      $type: Schema.Types.ObjectId,
      ref: 'Character'
    },
    image: String,
    url: String,
    created: String,
    last_updated: String
  },
  { typeKey: '$type', versionKey: false }
);

devilFruitSchema.statics.structure = (res) => {
  const sortSchema = ({
    id,
    name,
    alias,
    type,
    meaning,
    description,
    current_user,
    image,
    url,
    created,
    last_updated
  }: DevilFruitDocument): BaseDevilFruit => ({
    // Besides order structure, it sets empty(null/undefined) not required properties to explicitly null
    id,
    name,
    alias: alias ?? undefined, // we set alias as undefined due to null values are shown in the client response and we want only Hito Hito no Mi, Model: Nika to show the alias field
    type,
    meaning,
    description,
    current_user: current_user ?? null,
    image: image ?? null,
    url,
    created,
    last_updated
  });

  return Array.isArray(res) ? res.map(sortSchema) : sortSchema(res);
};

devilFruitSchema.statics.findAndCount = async function ({ name, type, skip }) {
  const regex = (key: string): RegExp =>
    new RegExp(/^zoan/i.test(key) ? `^${key}` : key.replace(/[^\w\s]/g, '\\$&'), 'i');

  const query: DevilFruitQuery = {};

  if (name != null) query.name = regex(name);
  if (type != null) query.type = regex(type);

  const populationSettings = getPopulationSettings(this.modelName) as mongoose.PopulateOptions; // asserts settings as PopulationOptions so when false value, this can be passed to populate method and skip the method when no need to populate

  const [data, count] = await Promise.all([
    this.find(query)
      .sort({ id: 1 })
      .select(collectionQueries.exclude)
      .limit(collectionQueries.limit)
      .skip(skip)
      .populate(populationSettings),
    this.find(query).countDocuments()
  ]);

  const results = this.structure(data);

  return { results, count };
};

export default mongoose.model<DevilFruitDocument, DevilFruitModel>('Devil_fruit', devilFruitSchema);
