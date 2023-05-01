import type { DevilFruitType } from 'types';

export function validateDevilFruitType(value: DevilFruitType): true {
  const VALID_TYPES = ['Paramecia', 'Logia', 'Zoan', 'Mythical Zoan'];

  if (!VALID_TYPES.includes(value))
    throw new Error('Devil fruit type only can be either "Paramecia", "Logia", "Zoan" or "Mythical Zoan"');

  return true;
}
