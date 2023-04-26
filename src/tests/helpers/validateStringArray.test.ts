import { validateStringArray } from '@utils/helpers/validations';

const validArray = ['Valid string', 'Other valid string'];
const invalidArrays = [
  [''], // empty value
  [34522] as unknown as Array<string>, // no strings values
  ['invalid string'], // not uppercase at the beginning
  ['Duplicate', 'Duplicate'] // duplicate values
];

const errorMessages = [
  'Argument must be an array with at least one element',
  'Argument must be a non-empty string',
  'First letter must be uppercase',
  'Must not be duplicated elements'
];

describe('validateStringArray function', () => {
  it('should return true on an array with valid strings', () => {
    expect(validateStringArray(validArray)).toBe(true);
  });
  it('should throw an error on an empty array', () => {
    expect(() => validateStringArray([])).toThrowError(errorMessages[0]);
  });
  it('should throw an error on an non-array argument', () => {
    expect(() => validateStringArray(1234 as unknown as Array<string>)).toThrowError(errorMessages[0]);
  });
  it('should throw an error on an array element with empty string', () => {
    expect(() => validateStringArray(invalidArrays[0])).toThrowError(errorMessages[1]);
  });
  it('should throw an error on an array with not only strings', () => {
    expect(() => validateStringArray(invalidArrays[1])).toThrowError(errorMessages[1]);
  });
  it('should throw an error on an array element with no uppercase at the beginning', () => {
    expect(() => validateStringArray(invalidArrays[2])).toThrowError(errorMessages[2]);
  });
  it('should throw an error on an array with duplicated elements', () => {
    expect(() => validateStringArray(invalidArrays[3])).toThrowError(errorMessages[3]);
  });
});
