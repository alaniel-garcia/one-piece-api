import { collectionQueries, getPopulationSettings } from '@utils/helpers';
import mongoose from 'mongoose';
import type { BaseHakiAbility, HakiAbilityDocument, HakiAbilityModel } from 'types';

const { Schema } = mongoose;

interface HakiAbilityQuery {
  name?: string | RegExp;
  skip?: number;
}

const hakiAbilitySchema = new Schema<HakiAbilityDocument, HakiAbilityModel>(
  {
    id: Number,
    name: {
      type: String,
      enum: ['Armament', 'Observation', 'Conqueror']
    },
    description: String,
    users: {
      type: [Schema.Types.ObjectId],
      ref: 'Character'
    },
    image: String,
    url: String,
    created: String,
    last_updated: String
  },
  { versionKey: false }
);

hakiAbilitySchema.statics.structure = (res) => {
  const sortSchema = ({
    id,
    name,
    description,
    users,
    image,
    url,
    created,
    last_updated
  }: HakiAbilityDocument): BaseHakiAbility => ({
    id,
    name,
    description,
    users,
    image,
    url,
    created,
    last_updated
  });

  return Array.isArray(res) ? res.map(sortSchema) : sortSchema(res);
};

hakiAbilitySchema.statics.findAndCount = async function ({ name, skip }) {
  const regex = (key: string): RegExp => new RegExp(key.replace(/[^\w\s]/g, '\\$&'), 'i');

  const query: HakiAbilityQuery = {};

  if (name != null) query.name = regex(name);

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

export default mongoose.model<HakiAbilityDocument, HakiAbilityModel>('Haki_ability', hakiAbilitySchema);
