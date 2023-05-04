import { validateMembership } from '@utils/helpers/validations/memberValidations';

describe('Member validation specific functions', () => {
  describe('validateMembership function', () => {
    it('should return true on valid membership inputs', () => {
      expect(validateMembership({ id: 1, name: 'Straw Hat Pirates', type: 'Crew' })).toBe(true);
      expect(validateMembership({ id: 1, name: 'Marines', type: 'Group' })).toBe(true);
    });
    it('should throw error on invalid membership inputs', () => {
      const errorMessage = 'Type property must be "Crew" or "Group" string';
      expect(() => validateMembership({ id: 1, name: 'Straw Hat Pirates', type: 'crew' as 'Crew' })).toThrowError(
        errorMessage
      );
      expect(() => validateMembership({ id: 1, name: 'Straw Hat Pirates', type: '' as 'Crew' })).toThrowError(
        errorMessage
      );
      expect(() => validateMembership({ id: 1, name: 'Marines', type: 'group' as 'Group' })).toThrow(errorMessage);
      expect(() => validateMembership({ id: 1, name: 'Marines', type: '' as 'Group' })).toThrow(errorMessage);
    });
  });
});
