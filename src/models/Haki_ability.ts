import mongoose from 'mongoose';
import type { BaseHakiAbility, HakiAbilityDocument, HakiAbilityModel } from 'types';

const { Schema } = mongoose;

const hakiAbilitySchema = new Schema<HakiAbilityDocument, HakiAbilityModel>(
  {
    id: Number,
    name: String,
    description: String,
    users: {
      type: [
        {
          id: Number,
          name: String,
          url: String
        }
      ],
      _id: false
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

hakiAbilitySchema.statics.findAndCount = async () => {
  // implement code after

  const results = '';
  const count = 0;

  return { results, count };
};

export default mongoose.model<HakiAbilityDocument, HakiAbilityModel>('Haki_ability', hakiAbilitySchema);
