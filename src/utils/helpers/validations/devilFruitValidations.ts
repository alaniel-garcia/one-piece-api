import type { DevilFruitType } from 'types';
import { validateString } from '.';

export function validateDevilFruitName(value: string): true {
  const regexDevilFruitName = /^(\w+\s)\1no Mi(,?\s[A-Za-z:]+)*$/;

  validateString(value);

  if (!regexDevilFruitName.test(value))
    throw new Error(
      'Devil Fruit name needs the first two words to be the same, and followed by "no Mi" examples: "Gomu Gomu no Mi", "Gura Gura no Mi", "Hito Hito no Mi, Model: Nika". Not allowed examples: "Gura gura no Mi", "Gomu no Mi", "Gomu Gomu mi no", "Mera Mera no mi"'
    );

  return true;
}

export function validateDevilFruitType(value: DevilFruitType): true {
  const VALID_TYPES = ['Paramecia', 'Logia', 'Zoan', 'Mythical Zoan'];

  if (!VALID_TYPES.includes(value))
    throw new Error('Devil fruit type only can be either "Paramecia", "Logia", "Zoan" or "Mythical Zoan"');

  return true;
}
