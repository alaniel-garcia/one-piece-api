import {
  validatePositiveNonZeroInteger,
  validateString,
  validateSubDoc,
  validateSubDocsArray,
  validateUrl
} from '@utils/helpers/validations';
import mongoose from 'mongoose';
import type { CrewDocument } from 'types';

const { Schema } = mongoose;

const crewSchema = new Schema({
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
  captain: {
    type: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      _id: false
    },
    required: true,
    validate: validateSubDoc
  },
  flag: {
    type: String,
    unique: true,
    validate: validateUrl
  },
  main_ship: {
    type: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      _id: false
    },
    required: true,
    validate: validateSubDoc
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

export default mongoose.model<CrewDocument>('crew', crewSchema);
