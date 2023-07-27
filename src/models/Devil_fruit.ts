import mongoose from 'mongoose';
import type { BaseDevilFruit, DevilFruitDocument, DevilFruitModel } from 'types';

const { Schema } = mongoose;

const devilFruitSchema = new Schema<DevilFruitDocument, DevilFruitModel>(
  {
    id: Number,
    name: String,
    type: {
      $type: String,
      enum: ['Paramecia', 'Logia', 'Zoan', 'Mythical Zoan']
    },
    meaning: String,
    description: String,
    current_user: {
      $type: {
        id: Number,
        name: String,
        url: String
      },
      _id: false
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
    alias: alias ?? null,
    type,
    meaning,
    description,
    current_user,
    image: image ?? null,
    url,
    created,
    last_updated
  });

  return Array.isArray(res) ? res.map(sortSchema) : sortSchema(res);
};

devilFruitSchema.statics.findAndCount = async () => {
  // implement code after

  const results = '';
  const count = 0;

  return { results, count };
};

export default mongoose.model<DevilFruitDocument, DevilFruitModel>('Devil_fruit', devilFruitSchema);
