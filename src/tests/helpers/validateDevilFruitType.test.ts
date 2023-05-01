import { validateDevilFruitType } from '@utils/helpers/validations/devilFruitValidations';
import type { DevilFruitType } from 'types';

describe('validateDevilFruitType function', () => {
  const DEVIL_FRUIT_TYPES: Array<DevilFruitType> = ['Paramecia', 'Logia', 'Zoan', 'Mythical Zoan'];
  const errorMessage = 'Devil fruit type only can be either "Paramecia", "Logia", "Zoan" or "Mythical Zoan"';

  it('should return true on valid devil fruit types', () => {
    expect(validateDevilFruitType(DEVIL_FRUIT_TYPES[0])).toBe(true);
    expect(validateDevilFruitType(DEVIL_FRUIT_TYPES[1])).toBe(true);
    expect(validateDevilFruitType(DEVIL_FRUIT_TYPES[2])).toBe(true);
    expect(validateDevilFruitType(DEVIL_FRUIT_TYPES[3])).toBe(true);
  });
  it('should throw error on invalid devil fruit types', () => {
    expect(() => validateDevilFruitType('paramecia' as DevilFruitType)).toThrowError(errorMessage);
    expect(() => validateDevilFruitType('logia' as DevilFruitType)).toThrowError(errorMessage);
    expect(() => validateDevilFruitType('zoan' as DevilFruitType)).toThrowError(errorMessage);
    expect(() => validateDevilFruitType('mythical zoan' as DevilFruitType)).toThrowError(errorMessage);
    expect(() => validateDevilFruitType('Mythical zoan' as DevilFruitType)).toThrowError(errorMessage);
  });
});
