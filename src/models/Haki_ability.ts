import {
  validatePositiveNonZeroInteger,
  validateString,
  validateSubDocsArray,
  validateUrl
} from '@utils/helpers/validations';
import { validateHakiAbilityName } from '@utils/helpers/validations/hakiAbilityValidations';
import mongoose from 'mongoose';
import type { HakiAbilityDocument } from 'types';

const { Schema } = mongoose;

const hakiAbilitySchema = new Schema({
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
    validate: validateHakiAbilityName
  },
  description: {
    type: String,
    required: true,
    validate: validateString
  },
  users: {
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
  image: {
    type: String,
    required: true,
    unique: true,
    validate: validateUrl
  }
});

export default mongoose.model<HakiAbilityDocument>('haki_ability', hakiAbilitySchema);
