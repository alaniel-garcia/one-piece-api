/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { validateOwnership } from '@utils/helpers/validations/shipValidations';
import type { Ownership } from 'types';

const validOwnerships: Array<Ownership> = [
  {
    id: 1,
    type: 'Pirate Crew',
    name: 'Straw Hat Pirates'
  },
  {
    type: 'Merchant'
  },
  {
    type: 'Navy'
  }
];
const errorMessages = [
  'Complete ownership input requires the following properties: "id", "type" and "name"',
  'Partial ownership input requires only "type" property'
];

describe('Ship schema specific validation functions', () => {
  describe('validateOwnership function', () => {
    it('should return true on valid ownership inputs', () => {
      expect(validateOwnership(validOwnerships[0])).toBe(true);
      expect(validateOwnership(validOwnerships[1])).toBe(true);
      expect(validateOwnership(validOwnerships[2])).toBe(true);
    });
    it('should throw error on invalid ownership inputs', () => {
      expect(() =>
        validateOwnership({
          id: 3,
          type: 'Pirate Crew',
          name: 'Red Hair Pirates',
          extra: 'invalid property'
        } as Ownership)
      ).toThrowError(errorMessages[0]);
      expect(() =>
        validateOwnership({
          id: 3,
          name: 'Red Hair Pirates'
        } as Ownership)
      ).toThrowError(errorMessages[0]);
      expect(() =>
        validateOwnership({
          id: 3,
          type: 'Pirate Crew'
        } as Ownership)
      ).toThrowError();
      expect(() =>
        validateOwnership({
          type: 'Pirate Crew',
          name: 'Red Hair Pirates'
        } as Ownership)
      ).toThrowError(errorMessages[1]);
      expect(() =>
        validateOwnership({
          name: 'Red Hair Pirates'
        } as Ownership)
      ).toThrowError(errorMessages[1]);
    });
  });
});
