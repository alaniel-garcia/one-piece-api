import Character from './Character';
import Race from './Race';
import Devil_fruit from './Devil_fruit';
import Haki_ability from './Haki_ability';
import type { ApiModelsHandler } from 'types';

const models: ApiModelsHandler = {
  characters: Character,
  races: Race,
  devil_fruits: Devil_fruit,
  haki_abilities: Haki_ability
};

export default models;
