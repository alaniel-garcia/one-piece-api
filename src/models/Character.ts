import mongoose from 'mongoose';
import {
  validateBackstory,
  validateBirthday,
  validateBounties,
  validateCharacterDevilFruit,
  validateFirstAppearance,
  validateCharacterHakiAbilities,
  validateHeight,
  validateStatus
} from '@utils/helpers/validations/characterValidations';
import {
  validatePositiveNonZeroInteger,
  validateString,
  validateStringArray,
  validateSubDoc,
  validateUrl
} from '@utils/helpers/validations';
import type { CharacterDocument } from 'types';

const { Schema } = mongoose;

const characterSchema = new Schema(
  {
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
    gender: {
      type: String,
      required: true,
      validate: validateString
    },
    race: {
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
    status: {
      type: String,
      required: true,
      validate: validateStatus,
      enum: ['Alive', 'Deceased', 'Unknown']
    },
    birthday: {
      type: String,
      validate: validateBirthday
    },
    main_occupations: {
      default: undefined,
      type: [String],
      validate: validateStringArray
    },
    devil_fruit: {
      type: Schema.Types.Mixed,
      validate: validateCharacterDevilFruit
    },
    haki_abilities: {
      default: undefined,
      type: [
        {
          id: {
            type: Number,
            required: true,
            validate: {
              validator: Number.isInteger
            }
          },
          name: {
            type: String,
            required: true,
            enum: ['Armament', 'Observation', 'Conqueror']
          },
          url: {
            type: String,
            required: true,
            validate: validateUrl
          },
          _id: false
        }
      ],
      validate: validateCharacterHakiAbilities
    },
    bounties: {
      default: undefined,
      type: [String],
      validate: validateBounties
    },
    height: {
      type: String,
      validate: validateHeight
    },
    first_appearance: {
      default: undefined,
      type: [String],
      required: true,
      validate: validateFirstAppearance
    },
    backstory: {
      type: String,
      required: true,
      validate: validateBackstory
    },
    image: {
      type: String,
      unique: true,
      validate: validateUrl
    }
  },
  { versionKey: false }
);

export default mongoose.model<CharacterDocument>('character', characterSchema);
