import {
  validatePositiveNonZeroInteger,
  validateString,
  validateSubDoc,
  validateUrl
} from '@utils/helpers/validations';
import { validateDevilFruitName, validateDevilFruitType } from '@utils/helpers/validations/devilFruitValidations';
import mongoose from 'mongoose';
import type { DevilFruitDocument } from 'types';

const { Schema } = mongoose;

const devilFruitDocument = new Schema({
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
    validate: validateDevilFruitName
  },
  type: {
    type: String,
    required: true,
    enum: ['Paramecia', 'Logia', 'Zoan', 'Mythical Zoan'],
    validate: validateDevilFruitType
  },
  meaning: {
    type: String,
    required: true,
    validate: validateString
  },
  description: {
    type: String,
    required: true,
    validate: validateString
  },
  current_user: {
    type: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      _id: false
    },
    required: true,
    validate: validateSubDoc
  },
  image: {
    type: String,
    unique: true,
    validate: validateUrl
  }
});

export default mongoose.model<DevilFruitDocument>('devil_fruit', devilFruitDocument);
