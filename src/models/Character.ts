import mongoose from 'mongoose';
import type { BaseCharacter, CharacterDocument, CharacterModel } from 'types';
import { collectionQueries, emptyArrayToNull } from '@utils/helpers';

const { Schema } = mongoose;

interface CharacterQuery {
  name?: string | RegExp;
  gender?: string | RegExp;
  'race.name'?: string | RegExp;
  origin?: string | RegExp;
  status?: string | RegExp;
  main_occupations?: {
    $all: Array<string | RegExp>;
  };
  skip?: number;
}

const characterSchema: mongoose.Schema<CharacterDocument, CharacterModel> = new Schema<
  CharacterDocument,
  CharacterModel
>(
  {
    id: Number,
    name: String,
    gender: String,
    race: {
      type: {
        id: Number,
        name: String,
        url: String
      },
      _id: false
    },
    origin: String,
    status: {
      type: String,
      enum: ['Alive', 'Deceased', 'Unknown']
    },
    birthday: String,
    main_occupations: [String],
    devil_fruit: Schema.Types.Mixed,
    haki_abilities: {
      type: [
        {
          id: Number,
          name: {
            type: String,
            enum: ['Armament', 'Observation', 'Conqueror']
          },
          url: String
        }
      ],
      _id: false
    },
    bounties: [String],
    height: String,
    debut: [String],
    backstory: String,
    image: String,
    url: String,
    created: String,
    last_updated: String
  },
  { versionKey: false }
);

characterSchema.statics.structure = (res) => {
  const sortSchema = ({
    id,
    name,
    gender,
    race,
    origin,
    status,
    birthday,
    main_occupations,
    devil_fruit,
    haki_abilities,
    bounties,
    height,
    debut,
    backstory,
    image,
    url,
    created,
    last_updated
  }: CharacterDocument): BaseCharacter => ({
    // Besides order structure, it sets empty(null/undefined) not required properties to explicitly null
    id,
    name,
    gender,
    race,
    origin,
    status,
    birthday: birthday ?? null,
    main_occupations: emptyArrayToNull(main_occupations),
    devil_fruit: devil_fruit ?? null,
    haki_abilities: emptyArrayToNull(haki_abilities),
    bounties: emptyArrayToNull(bounties),
    height: height ?? null,
    debut,
    backstory,
    image: image ?? null,
    url,
    created,
    last_updated
  });

  return Array.isArray(res) ? res.map(sortSchema) : sortSchema(res);
};

characterSchema.statics.findAndCount = async function ({ name, gender, race, origin, status, main_occupations, skip }) {
  const regex = (key: string): RegExp =>
    new RegExp(/^male/i.test(key) ? `^${key}` : key.replace(/[^\w\s]/g, '\\$&'), 'i');

  const query: CharacterQuery = {};

  if (name !== undefined) query.name = regex(name);
  if (gender !== undefined) query.gender = regex(gender);
  if (race !== undefined) {
    query['race.name'] = regex(race);
  }
  if (origin !== undefined) query.origin = regex(origin);
  if (status !== undefined) query.status = regex(status);
  if (main_occupations !== undefined) {
    const occupationsArray = (main_occupations as string).split(',');
    query.main_occupations = { $all: occupationsArray.map((occ) => regex(occ)) }; // filter by ocuppation in the array
  }

  const [data, count] = await Promise.all([
    this.find(query).sort({ _id: 1 }).select(collectionQueries.exclude).limit(collectionQueries.limit).skip(skip),
    this.find(query).countDocuments()
  ]);

  const results = this.structure(data);

  return { results, count };
};

export default mongoose.model<CharacterDocument, CharacterModel>('Character', characterSchema);
