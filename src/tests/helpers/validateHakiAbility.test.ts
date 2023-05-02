import { validateHakiAbilityName } from '@utils/helpers/validations/hakiAbilityValidations';
import type { HakiAbilityName } from 'types';

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
});
