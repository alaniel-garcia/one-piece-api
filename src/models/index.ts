import Character from './Character';
import Race from './Race';
import Devil_fruit from './Devil_fruit';
import Haki_ability from './Haki_ability';
import Group from './Group';
import Crew from './Crew';
import Member from './Member';
import Ship from './Ship';
import Location from './Location';
import type { ApiModelsHandler } from 'types';

const models: ApiModelsHandler = {
  characters: Character,
  races: Race,
  devil_fruits: Devil_fruit,
  haki_abilities: Haki_ability,
  groups: Group,
  crews: Crew,
  members: Member,
  ships: Ship,
  locations: Location
};

export default models;
