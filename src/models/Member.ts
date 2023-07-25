import type { BaseMember, MemberDocument, MemberModel } from 'types';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const memberSchema = new Schema<MemberDocument, MemberModel>(
  {
    id: Number,
    character: {
      $type: {
        id: Number,
        name: String,
        image: String,
        url: String
      },
      _id: false
    },
    membership: {
      $type: {
        id: Number,
        name: String,
        type: {
          $type: String,
          enum: ['Crew', 'Group']
        },
        url: String
      },
      _id: false
    },
    rol: String,
    status: String,
    details: String,
    url: String,
    created: String,
    last_updated: String
  },
  { typeKey: '$type', versionKey: false }
);

memberSchema.statics.structure = (res) => {
  const sortSchema = ({
    id,
    character,
    membership,
    rol,
    status,
    details,
    url,
    created,
    last_updated
  }: MemberDocument): BaseMember => {
    // Besides order structure, it sets empty(null/undefined) not required properties to explicitly null

    character.image ??= null;

    return {
      id,
      character,
      membership,
      rol,
      status,
      details,
      url,
      created,
      last_updated
    };
  };

  memberSchema.statics.findAndCount = async () => {
    // implement code after

    const results = '';
    const count = 0;

    return { results, count };
  };

  return Array.isArray(res) ? res.map(sortSchema) : sortSchema(res);
};

export default mongoose.model<MemberDocument, MemberModel>('Member', memberSchema);
