import type mongoose from 'mongoose';

export const BASE_URL =
  process.env.NODE_ENV === 'production' ? 'https://www.onepieceapi.net/api' : `http://localhost:5000/api`;

interface CollQuery {
  exclude: string;
  limit: number;
  queries: {
    [key: string]: Array<string>;
    character: Array<string>;
    race: Array<string>;
    devil_fruit: Array<string>;
    haki_ability: Array<string>;
    group: Array<string>;
    crew: Array<string>;
    member: Array<string>;
    ship: Array<string>;
    location: Array<string>;
  };
}

interface PathsToModels {
  [key: string]: string;
  characters: 'character';
  races: 'race';
  devil_fruits: 'devil_fruit';
  haki_abilities: 'haki_ability';
  groups: 'group';
  crews: 'crew';
  members: 'member';
  ships: 'ship';
  locations: 'location';
}

// function that receives a path(which is plural), and turn it into a model, in order to use query params as key for models calling
export function turnPathIntoModel(path: string): string {
  const referencePaths: PathsToModels = {
    characters: 'character',
    races: 'race',
    devil_fruits: 'devil_fruit',
    haki_abilities: 'haki_ability',
    groups: 'group',
    crews: 'crew',
    members: 'member',
    ships: 'ship',
    locations: 'location'
  };
  return referencePaths[path];
}

// Used in structure static method for schemas. It set prop to any type in order to not assert the value every time this gets called
export function emptyArrayToNull<T>(prop: any): Array<T> | null {
  return (prop as Array<T>).length > 0 ? prop : null;
}

export function getPopulationSettings(
  modelName: string
): mongoose.PopulateOptions | Array<mongoose.PopulateOptions> | false {
  // this function returns false for those models that not require population so the process can be skipped

  if (modelName === 'Character') {
    return [
      { path: 'race haki_abilities', select: 'name url -_id' },
      { path: 'devil_fruit', model: 'Devil_fruit', select: 'name alias url -_id' }
    ];
  }

  if (modelName === 'Devil_fruit') {
    return { path: 'current_user', select: 'name url image -_id' };
  }

  if (modelName === 'Race') return false;

  throw new Error('Invalid model name');
}

export const collectionQueries: CollQuery = {
  exclude: '-_id -author -__v -edited',
  limit: 10,
  queries: {
    character: ['name', 'gender', 'race', 'origin', 'status', 'main_occupations'],
    race: ['name'],
    devil_fruit: ['name', 'type'],
    haki_ability: ['name'],
    group: [],
    crew: [],
    member: [],
    ship: [],
    location: []
  }
};

export const message: Record<string, string> = {
  noPage: 'Requested page does not exist.',
  noCharacter: 'Character not found',
  noRace: 'Race not found',
  noDevil_fruit: 'Devil Fruit not found',
  noHaki_ability: 'Haki Ability not found',
  noGroup: 'Group not found',
  noCrew: 'Crew not found',
  noMember: 'Member not found',
  noShip: 'Ship not found',
  noLocation: 'Location not found',
  badParam: 'You must provide an id',
  badArray: 'Bad array provided'
};
