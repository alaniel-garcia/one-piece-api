import mongoose from 'mongoose';
import type { BaseGroup, GroupDocument, GroupModel } from 'types';

const { Schema } = mongoose;

const groupSchema = new Schema<GroupDocument, GroupModel>(
  {
    id: Number,
    name: String,
    members: {
      type: [
        {
          id: Number,
          name: String,
          url: String
        }
      ],
      _id: false
    },
    background: String,
    image: String,
    url: String,
    created: String,
    last_updated: String
  },
  { versionKey: false }
);

groupSchema.statics.structure = (res) => {
  const sortSchema = ({
    id,
    name,
    members,
    background,
    image,
    url,
    created,
    last_updated
  }: GroupDocument): BaseGroup => ({
    // Besides order structure, it sets empty(null/undefined) not required properties to explicitly null
    id,
    name,
    members,
    background,
    image: image ?? null,
    url,
    created,
    last_updated
  });

  return Array.isArray(res) ? res.map(sortSchema) : sortSchema(res);
};

groupSchema.statics.findAndCount = async () => {
  // implement code after

  const results = '';
  const count = 0;

  return { results, count };
};

export default mongoose.model<GroupDocument, GroupModel>('Group', groupSchema);
