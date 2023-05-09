import type { Ownership, SubDocument } from 'types';
import { validateString, validateSubDoc } from '.';

export function validateOwnership(value: Ownership): true {
  const { type, ...subdoc } = value;
  const validKeys = ['id', 'type', 'name'];
  const inputKeys = Object.keys(value);

  if (value.id != null) {
    validateSubDoc(subdoc as SubDocument);
    if (!(inputKeys.length === 3 && validKeys.every((el) => el in value)))
      throw new Error('Complete ownership input requires the following properties: "id", "type" and "name"');

    validateString(type);

    return true;
  }

  if (!('type' in value && inputKeys.length === 1))
    throw new Error('Partial ownership input requires only "type" property');

  validateString(type);

  return true;
}
