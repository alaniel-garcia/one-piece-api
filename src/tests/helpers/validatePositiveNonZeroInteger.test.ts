import { validatePositiveNonZeroInteger } from '@utils/helpers/validations';

describe('validatePositiveNonZeroInteger function', () => {
  const errorMessage = 'Argument must be a positive non-zero integer. Received: ';
  it('should validate a positive integer', () => {
    expect(validatePositiveNonZeroInteger(5)).toBe(true);
  });
  it('should throw an error on a negative integer', () => {
    expect(() => validatePositiveNonZeroInteger(-5)).toThrowError(errorMessage + '-5');
  });
  it('should throw an error on a 0 integer', () => {
    expect(() => validatePositiveNonZeroInteger(0)).toThrowError(errorMessage + '0');
  });
  it('should throw an error on a non-integer', () => {
    expect(() => validatePositiveNonZeroInteger(0.7)).toThrowError(errorMessage + '0.7');
  });
  it('should throw an error on a string input', () => {
    expect(() => validatePositiveNonZeroInteger('test' as unknown as number)).toThrowError(errorMessage + 'test');
  });
});
