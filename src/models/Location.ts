import { validatePositiveNonZeroInteger, validateString, validateUrl } from '@utils/helpers/validations';
import mongoose from 'mongoose';
import type { LocationDocument } from 'types';

const { Schema } = mongoose;
const locationSchema = new Schema({
  _id: {
    $type: Number,
    required: true,
    unique: true,
    validate: validatePositiveNonZeroInteger
  },
  name: {
    $type: String,
    required: true,
    unique: true,
    validate: validateString
  },
  type: {
    $type: String,
    required: true,
    validate: validateString
  },
  description: {
    $type: String,
    required: true,
    validate: validateString
  },
  population: {
    $type: String,
    validate: validateString
  },
  government: {
    $type: String,
    validate: validateString
  },
  history: {
    $type: String,
    required: true,
    validate: validateString
  },
  image: {
    $type: String,
    required: true,
    validate: validateUrl
  }
});

export default mongoose.model<LocationDocument>('location', locationSchema);
