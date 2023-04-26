import { BASE_URL, collections } from '@utils/index';
import { validateUrl } from '@utils/helpers/validations';

const errorMessages = [
  'Argument must be a valid uri format',
  `Invalid URL format. Please ensure that the URL matches the correct format: ${BASE_URL}/{collection}/{id} or ${BASE_URL}/{collection}/image/{id}, where {collection} is one of the available collections and {id} is a non-zero integer.`
];
const testBaseURL = `${BASE_URL}/${collections.character}`;

describe('validateUrl function', () => {
  it('should return true for valid URL formats', () => {
    expect(validateUrl(`${testBaseURL}/1`)).toBe(true);
    expect(validateUrl(`${testBaseURL}/image/1`)).toBe(true);
    expect(validateUrl(`${BASE_URL}/${collections.haki_ability}/1`)).toBe(true);
    expect(validateUrl(`${BASE_URL}/${collections.devil_fruit}/1`)).toBe(true);
    expect(validateUrl(`${BASE_URL}/${collections.crew}/image/1`)).toBe(true);
  });
  describe('URI format errors', () => {
    it('should throw an error on an empty string', () => {
      expect(() => validateUrl('')).toThrowError('Argument must be a non-empty string');
    });
    it('should throw an error on an invalid URI format', () => {
      expect(() => validateUrl('invalidurl')).toThrowError(errorMessages[0]);
    });

    it('should throw an error on a missing scheme in URL', () => {
      expect(() => validateUrl('www.example.com')).toThrowError(errorMessages[0]);
    });

    it('should throw an error on a missing host in URL', () => {
      expect(() => validateUrl('https://')).toThrowError(errorMessages[0]);
    });
  });
  describe('Expected valid format errors', () => {
    it('should throw an error on invalid URL formats', () => {
      expect(() => validateUrl(`${testBaseURL}/xd`)).toThrowError(errorMessages[1]);
      expect(() => validateUrl(`${testBaseURL}/0`)).toThrowError(errorMessages[1]);
      expect(() => validateUrl(`${testBaseURL}/1/image/1`)).toThrowError(errorMessages[1]);
      expect(() => validateUrl(`${testBaseURL}/image/xd`)).toThrowError(errorMessages[1]);
      expect(() => validateUrl(`${testBaseURL}/image/0`)).toThrowError(errorMessages[1]);
    });
  });
});
