import { validateSubDoc } from '@utils/helpers/validations/index';
import type { SubDocument } from 'types';

describe('validateSubDoc function', () => {
  it('should return true on a valid SubDoc object', () => {
    const validSubDoc: SubDocument = { id: 1, name: 'Human' };
    expect(validateSubDoc(validSubDoc)).toBe(true);
  });
  it('should throw an error on non object argument', () => {
    const invalidSubDoc = 'not an object' as unknown as SubDocument;
    expect(() => validateSubDoc(invalidSubDoc)).toThrowError('Invalid argument: not an object. Must be an object.');
  });
  it('should throw an error on missing id', () => {
    const invalidSubDoc = { name: 'Human' } as unknown as SubDocument;
    expect(() => validateSubDoc(invalidSubDoc)).toThrowError(
      `Invalid argument: [object Object]. Must have an 'id' property.`
    );
  });
  it('should throw an error on missing name', () => {
    const invalidSubDoc = { id: 1 } as unknown as SubDocument;
    expect(() => validateSubDoc(invalidSubDoc)).toThrowError(
      `Invalid argument: [object Object]. Must have a 'name' property.`
    );
  });
  it('should throw an error on invalid names', () => {
    const invalidSubDoc = { id: 1, name: 'invalid name' } as unknown as SubDocument;
    expect(() => validateSubDoc(invalidSubDoc)).toThrowError('First letter must be uppercase');
    invalidSubDoc.name = '    ';
    expect(() => validateSubDoc(invalidSubDoc)).toThrowError('Argument must be a non-empty string');
  });
  it('should throw an error on invalid ids', () => {
    const invalidSubDoc = { id: -5, name: 'Valid name' } as unknown as SubDocument;
    expect(() => validateSubDoc(invalidSubDoc)).toThrowError(
      'Argument must be a positive non-zero integer. Received: -5'
    );
    invalidSubDoc.id = 3.67;
    expect(() => validateSubDoc(invalidSubDoc)).toThrowError(
      'Argument must be a positive non-zero integer. Received: 3.67'
    );
  });
});
