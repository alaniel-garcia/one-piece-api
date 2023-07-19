export const BASE_URL =
  process.env.NODE_ENV === 'production' ? 'https://www.onepieceapi.net/api' : `http://localhost:5000/api`;

interface CollQuery {
  exclude: string;
  limit: number;
  queries: {
    [key: string]: Array<string>;
    characters: Array<string>;
    races: Array<string>;
    devil_fruits: Array<string>;
    haki_abilities: Array<string>;
    groups: Array<string>;
    crews: Array<string>;
    members: Array<string>;
    ships: Array<string>;
    locations: Array<string>;
  };
}

export const collectionQueries: CollQuery = {
  exclude: '-_id -author -__v -edited',
  limit: 10,
  queries: {
    characters: ['name', 'gender', 'race', 'origin', 'status', 'main_occupations'],
    races: ['name'],
    devil_fruits: ['name', 'type'],
    haki_abilities: ['name'],
    groups: [],
    crews: [],
    members: [],
    ships: [],
    locations: []
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
