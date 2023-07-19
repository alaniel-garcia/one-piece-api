import mongoose from 'mongoose';
import type { BaseCrew, CrewDocument, CrewModel } from 'types';

const { Schema } = mongoose;

const crewSchema = new Schema<CrewDocument, CrewModel>(
  {
    id: Number,
    name: String,
    captain: {
      type: {
        id: Number,
        name: String,
        url: String
      },
      _id: false
    },
    flag: String,
    main_ship: {
      type: {
        id: Number,
        name: String,
        url: String
      },
      _id: false
    },
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
crewSchema.statics.structure = (res) => {
  const sortSchema = ({
    id,
    name,
    captain,
    flag,
    main_ship,
    members,
    background,
    image,
    url,
    created,
    last_updated
  }: CrewDocument): BaseCrew => ({
    id,
    name,
    captain,
    flag,
    main_ship,
    members,
    background,
    image,
    url,
    created,
    last_updated
  });

  return Array.isArray(res) ? res.map(sortSchema) : sortSchema(res);
};

crewSchema.statics.findAndCount = async () => {
  // implement code after

  const results = '';
  const count = 0;

  return { results, count };
};

export default mongoose.model<CrewDocument, CrewModel>('Crew', crewSchema);
