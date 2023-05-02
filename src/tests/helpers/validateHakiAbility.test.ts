import { validateHakiAbilityName, validateHakiAbilityUsers } from '@utils/helpers/validations/hakiAbilityValidations';
import { BASE_URL } from '@utils/index';
import type { HakiAbilityName, SubDocument } from 'types';

const VALID_HAKI_ABILITIES: Array<HakiAbilityName> = ['Armament', 'Observation', 'Conqueror'];
const errorMessage = `Every element requires a name that can only be either ${VALID_HAKI_ABILITIES.join(', ')}`;

describe('Haki abilities specific validation functions', () => {
  describe('validateHakiAbilityName function', () => {
    it('should return true on valid haki abilities', () => {
      expect(validateHakiAbilityName(VALID_HAKI_ABILITIES[0])).toBe(true);
      expect(validateHakiAbilityName(VALID_HAKI_ABILITIES[1])).toBe(true);
      expect(validateHakiAbilityName(VALID_HAKI_ABILITIES[2])).toBe(true);
    });
    it('should throw error on invalid haki abilities', () => {
      expect(() => validateHakiAbilityName('armament' as HakiAbilityName)).toThrowError(errorMessage);
      expect(() => validateHakiAbilityName('observation' as HakiAbilityName)).toThrowError(errorMessage);
      expect(() => validateHakiAbilityName('conqueror' as HakiAbilityName)).toThrowError(errorMessage);
      expect(() => validateHakiAbilityName({} as unknown as HakiAbilityName)).toThrowError();
    });
  });
  describe('validateHakiAbilityUsers function', () => {
    const users: Array<SubDocument> = [
      {
        id: 1,
        name: 'Monkey D. Luffy',
        url: `${BASE_URL}/character/1`
      },
      {
        id: 2,
        name: 'Roronoa Zoro',
        url: `${BASE_URL}/character/2`
      },
      {
        id: 3,
        name: 'Nami',
        url: `${BASE_URL}/character/3`
      }
    ];

    const errorMessage = 'Haki ability users must be an array with at least 1 element';

    it('should return true on a valid haki ability users inputs', () => {
      expect(validateHakiAbilityUsers(users)).toBe(true);
      expect(validateHakiAbilityUsers([users[0]])).toBe(true);
      expect(validateHakiAbilityUsers([users[0], users[1]])).toBe(true);
    });
    it('should throw error on invalid haki ability users inputs', () => {
      expect(() => validateHakiAbilityUsers(users[0] as unknown as Array<SubDocument>)).toThrowError(errorMessage);
      expect(() => validateHakiAbilityUsers([] as unknown as Array<SubDocument>)).toThrowError(errorMessage);
      expect(() => validateHakiAbilityUsers([users[0], users[0]])).toThrowError();
      expect(() => validateHakiAbilityUsers([{ id: 1, name: 'Monkey D. Luffy' }] as Array<SubDocument>)).toThrowError();
      expect(() =>
        validateHakiAbilityUsers([{ id: 1, url: `${BASE_URL}/character/1` }] as Array<SubDocument>)
      ).toThrowError();
      expect(() =>
        validateHakiAbilityUsers([{ name: 'Monket D. Luffy', url: `${BASE_URL}/character/1` }] as Array<SubDocument>)
      ).toThrowError();
    });
  });
});
