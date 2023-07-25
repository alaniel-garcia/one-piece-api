import mongoose from 'mongoose';
import type { BaseShip, ShipDocument, ShipModel } from 'types';

const { Schema } = mongoose;

const shipSchema = new Schema<ShipDocument, ShipModel>(
  {
    id: Number,
    name: String,
    description: String,
    ownership: {
      $type: {
        id: Number,
        type: {
          $type: String
        },
        name: String,
        url: String
      },
      _id: false
    },
    flag: String,
    image: String,
    url: String,
    created: String,
    last_updated: String
  },
  { typeKey: '$type', versionKey: false }
);

shipSchema.statics.structure = (res) => {
  const sortSchema = ({
    id,
    name,
    description,
    ownership,
    flag,
    image,
    url,
    created,
    last_updated
  }: ShipDocument): BaseShip => ({
    // Besides order structure, it sets empty(null/undefined) not required properties to explicitly null
    id,
    name,
    description,
    ownership,
    flag: flag ?? null,
    image: image ?? null,
    url,
    created,
    last_updated
  });

  return Array.isArray(res) ? res.map(sortSchema) : sortSchema(res);
};

shipSchema.statics.findAndCount = async () => {
  // implement code after

  const results = '';
  const count = 0;

  return { results, count };
};

export default mongoose.model<ShipDocument, ShipModel>('Ship', shipSchema);
