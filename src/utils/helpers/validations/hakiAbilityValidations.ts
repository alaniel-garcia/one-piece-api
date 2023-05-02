import type { HakiAbilityName } from 'types';

export function validateHakiAbilityName(value: HakiAbilityName): true {
  const VALID_HAKI_ABILITIES = ['Armament', 'Observation', 'Conqueror'];

  if (!VALID_HAKI_ABILITIES.includes(value))
    throw new Error(`Every element requires a name that can only be either ${VALID_HAKI_ABILITIES.join(', ')}`);
  return true;
}
