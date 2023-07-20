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

export const message = {
  noPage: 'Requested page does not exist.',
  noCharacter: 'Character not found',
  noRace: 'Race not found',
  noDevilFruit: 'Devil Fruit not found',
  noHakiAbility: 'Haki Ability not found',
  noGroup: 'Group not found',
  noCrew: 'Crew not found',
  noMember: 'Member not found',
  noShip: 'Ship not found',
  noLocation: 'Location not found'
};
