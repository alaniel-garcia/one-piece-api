import { validateString } from '@utils/helpers/validations';

const errorMessages = ['First letter must be uppercase', 'Argument must be a non-empty string'];

describe('validateString function', () => {
  it('should valid a non-empty string with first letter uppercase', () => {
    expect(validateString('Valid string')).toBe(true);
  });
  it('should throw an error for a not uppercase input', () => {
    expect(() => validateString('invalid string')).toThrowError(errorMessages[0]);
  });
  it('should throw an error for an empty input', () => {
    expect(() => validateString('')).toThrowError(errorMessages[1]);
  });
  it('should throw an error for an only white spaces input', () => {
    expect(() => validateString('   ')).toThrowError(errorMessages[1]);
  });
  it('should throw an error for an only numbers input', () => {
    expect(() => validateString(1312323 as unknown as string)).toThrowError(errorMessages[1]);
  });
});
