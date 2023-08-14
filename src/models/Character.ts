import mongoose from 'mongoose';
import type { BaseCharacter, CharacterDocument, CharacterModel } from 'types';
import { collectionQueries, emptyArrayToNull, getPopulationSettings } from '@utils/helpers';

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
      type: Schema.Types.ObjectId,
      ref: 'Race'
    },
    origin: String,
    status: {
      type: String,
      enum: ['Alive', 'Deceased', 'Unknown']
    },
    birthday: String,
    main_occupations: [String],
    devil_fruit: Schema.Types.Mixed, // not setting ref here cause if so, not all devil fruits for arrays are retrieve but just one
    haki_abilities: {
      type: [Schema.Types.ObjectId],
      ref: 'Haki_ability'
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
  { versionKey: false, toJSON: { virtuals: true }, toObject: { virtuals: true } }
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

  if (name != null) query.name = regex(name);
  if (gender != null) query.gender = regex(gender);
  if (race != null) {
    query['race.name'] = regex(race);
  }
  if (origin != null) query.origin = regex(origin);
  if (status != null) query.status = regex(status);
  if (main_occupations != null) {
    const occupationsArray = (main_occupations as string).split(',');
    query.main_occupations = { $all: occupationsArray.map((occ) => regex(occ)) }; // filter by ocuppation in the array
  }

  const [data, count] = await Promise.all([
    this.find(query)
      .sort({ id: 1 })
      .select(collectionQueries.exclude)
      .limit(collectionQueries.limit)
      .skip(skip)
      .populate(getPopulationSettings(this.modelName)),
    this.find(query).countDocuments()
  ]);

  const results = this.structure(data);

  return { results, count };
};

export default mongoose.model<CharacterDocument, CharacterModel>('Character', characterSchema);
