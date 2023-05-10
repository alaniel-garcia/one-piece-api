import { validatePositiveNonZeroInteger, validateString, validateUrl } from '@utils/helpers/validations';
import { validateOwnership } from '@utils/helpers/validations/shipValidations';
import mongoose from 'mongoose';
import type { ShipDocument } from 'types';

const { Schema } = mongoose;

const shipSchema = new Schema(
  {
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
    description: {
      $type: String,
      required: true,
      validate: validateString
    },
    ownership: {
      $type: {
        id: Number,
        type: {
          $type: String,
          required: true
        },
        name: String,
        _id: false
      },
      required: true,
      validate: validateOwnership
    },
    flag: {
      $type: String,
      validate: validateUrl
    },
    image: {
      $type: String,
      validate: validateUrl
    }
  },
  { typeKey: '$type' }
);

export default mongoose.model<ShipDocument>('Ship', shipSchema);
