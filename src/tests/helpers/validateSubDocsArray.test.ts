import { validateSubDocsArray } from '@utils/helpers/validations';
import { BASE_URL } from '@utils/index';
import type { SubDocument } from 'types';

describe('validateSubDocsArray function', () => {
  const subDocsArray: Array<SubDocument> = [
    {
      id: 1,
      name: 'Monkey D. Luffy',
      url: `${BASE_URL}/character/1`
    },
    {
      id: 2,
      name: 'Going Merry',
      url: `${BASE_URL}/ship/2`
    },
    {
      id: 3,
      name: 'Gura Gura no mi',
      url: `${BASE_URL}/devil_fruit/3`
    }
  ];

  const errorMessage = 'Argument must be an array with at least 1 element';

  it('should return true on a valid subDocsArray inputs', () => {
    expect(validateSubDocsArray(subDocsArray)).toBe(true);
    expect(validateSubDocsArray([subDocsArray[0]])).toBe(true);
    expect(validateSubDocsArray([subDocsArray[0], subDocsArray[1]])).toBe(true);
  });
  it('should throw error on invalid subDocsArray inputs', () => {
    expect(() => validateSubDocsArray(subDocsArray[0] as unknown as Array<SubDocument>)).toThrowError(errorMessage);
    expect(() => validateSubDocsArray([] as unknown as Array<SubDocument>)).toThrowError(errorMessage);
    expect(() => validateSubDocsArray([subDocsArray[0], subDocsArray[0]])).toThrowError();
    expect(() => validateSubDocsArray([{ id: 1, name: 'Monkey D. Luffy' }] as Array<SubDocument>)).toThrowError();
    expect(() =>
      validateSubDocsArray([{ id: 1, url: `${BASE_URL}/character/1` }] as Array<SubDocument>)
    ).toThrowError();
    expect(() =>
      validateSubDocsArray([{ name: 'Monkey D. Luffy', url: `${BASE_URL}/character/1` }] as Array<SubDocument>)
    ).toThrowError();
  });
});
