import {
  validatePositiveNonZeroInteger,
  validateString,
  validateSubDocsArray,
  validateUrl
} from '@utils/helpers/validations';
import mongoose from 'mongoose';
import type { GroupDocument } from 'types';

const { Schema } = mongoose;

const groupSchema = new Schema({
  _id: {
    type: Number,
    required: true,
    unique: true,
    validate: validatePositiveNonZeroInteger
  },
  name: {
    type: String,
    required: true,
    unique: true,
    validate: validateString
  },
  members: {
    default: undefined,
    type: [
      {
        id: {
          type: Number,
          required: true,
          validate: validatePositiveNonZeroInteger
        },
        name: {
          type: String,
          required: true,
          validate: validateString
        },
        _id: false
      }
    ],
    validate: validateSubDocsArray
  },
  background: {
    type: String,
    required: true,
    validate: validateString
  },
  image: {
    type: String,
    unique: true,
    validate: validateUrl
  }
});

export default mongoose.model<GroupDocument>('group', groupSchema);
