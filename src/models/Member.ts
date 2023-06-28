import { validatePositiveNonZeroInteger, validateString, validateSubDoc } from '@utils/helpers/validations';
import { validateMembership } from '@utils/helpers/validations/memberValidations';
import type { MemberDocument } from 'types';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const memberSchema = new Schema(
  {
    _id: {
      $type: Number,
      validate: validatePositiveNonZeroInteger
    },
    character: {
      $type: {
        id: {
          $type: Number,
          required: true
        },
        name: {
          $type: String,
          required: true
        },
        _id: false
      },
      required: true,
      validate: validateSubDoc
    },
    membership: {
      $type: {
        id: {
          $type: Number,
          required: true
        },
        name: {
          $type: String,
          required: true
        },
        type: {
          $type: String,
          required: true,
          enum: ['Crew', 'Group']
        },
        _id: false
      },
      required: true,
      validate: validateMembership
    },
    rol: {
      $type: String,
      required: true,
      validate: validateString
    },
    status: {
      $type: String,
      required: true,
      validate: validateString
    },
    details: {
      $type: String,
      required: true,
      validate: validateString
    }
  },
  { typeKey: '$type' }
);

export default mongoose.model<MemberDocument>('Member', memberSchema);
