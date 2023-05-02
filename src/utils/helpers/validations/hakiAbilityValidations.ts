import type { HakiAbilityName, SubDocument } from 'types';
import { validateSubDoc, validateSubDocArraysDuplicity } from '.';

export function validateHakiAbilityName(value: HakiAbilityName): true {
  const VALID_HAKI_ABILITIES = ['Armament', 'Observation', 'Conqueror'];

  if (!VALID_HAKI_ABILITIES.includes(value))
    throw new Error(`Every element requires a name that can only be either ${VALID_HAKI_ABILITIES.join(', ')}`);
  return true;
}

export function validateHakiAbilityUsers(value: Array<SubDocument>): true {
  if (!(Array.isArray(value) && value.length >= 1))
    throw new Error('Haki ability users must be an array with at least 1 element');

  value.forEach((element) => validateSubDoc(element));

  validateSubDocArraysDuplicity(value);
  return true;
}
