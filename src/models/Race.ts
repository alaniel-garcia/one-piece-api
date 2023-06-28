import { validatePositiveNonZeroInteger, validateString, validateUrl } from '@utils/helpers/validations';
import mongoose from 'mongoose';
import type { RaceDocument } from 'types';

const { Schema } = mongoose;

const raceSchema = new Schema({
  _id: {
    type: Number,
    validate: validatePositiveNonZeroInteger
  },
  name: {
    type: String,
    required: true,
    unique: true,
    validate: validateString
  },
  homeland: {
    type: String,
    required: true,
    validate: validateString
  },
  about: {
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

export default mongoose.model<RaceDocument>('Race', raceSchema);
