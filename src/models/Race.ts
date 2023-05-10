import { validatePositiveNonZeroInteger, validateString, validateUrl } from '@utils/helpers/validations';
import mongoose from 'mongoose';
import type { RaceDocument } from 'types';

const { Schema } = mongoose;

const raceSchema = new Schema({
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
  description: {
    type: String,
    required: true,
    validate: validateString
  },
  average_lifespan: {
    type: String,
    validate: validateString
  },
  homeland: {
    type: String,
    required: true,
    validate: validateString
  },
  history: {
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
