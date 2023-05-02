/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// General validations

import { BASE_URL, collections } from '@utils/index';
import type { SubDocument } from 'types';

export function validateFirstStringLetterUppercase(value: string): true {
  const regexFirstLetterUppercase = /^[A-Z]/;
  if (!regexFirstLetterUppercase.test(value)) throw new Error('First letter must be uppercase');

  return true;
}

export function validateNonEmptyString(value: string): true {
  const ONLY_WHITESPACES_REGEX = /^\s*$/;
  // const ONLY_NUMBERS_REGEX = /^[\d.,+\-*/()]+$/;
  if (!(typeof value === 'string' && value.length > 0 && !ONLY_WHITESPACES_REGEX.test(value)))
    throw new Error('Argument must be a non-empty string.');

  return true;
}

export function validateString(value: string): true {
  validateNonEmptyString(value);
  validateFirstStringLetterUppercase(value);
  return true;
}

export function validatePositiveNonZeroInteger(value: number): true {
  if (!(Number.isInteger(value) && value >= 1))
    throw new Error(`Argument must be a positive non-zero integer. Received: ${value}`);

  return true;
}

export function validateUrl(value: string): true {
  validateNonEmptyString(value);
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const url = new URL(value);
  } catch (error) {
    throw new Error('Argument must be a valid uri format');
  }

  const urlRegex = new RegExp(`^(${BASE_URL}/(${Object.values(collections).join('|')}))(?:/image)?/(?!0)\\d+$`);
  // const urlRegex = new RegExp(`^${BASE_URL}/${Object.values(collections).join('|')}(?:/image)/(!0)\\d+$`);
  // const urlRegex = new RegExp(``);
  if (!urlRegex.test(value))
    throw new Error(
      `Invalid URL format. Please ensure that the URL matches the correct format: ${BASE_URL}/{collection}/{id} or ${BASE_URL}/{collection}/image/{id}, where {collection} is one of the available collections and {id} is a non-zero integer.`
    );

  return true;
}

export function validateSubDoc(value: SubDocument): true {
  if (!(typeof value === 'object' && value !== null)) throw new Error(`Invalid argument: ${value}. Must be an object.`);

  if (!value.id) throw new Error(`Invalid argument: ${value}. Must have an 'id' property.`);
  validatePositiveNonZeroInteger(value.id);

  if (!value.name) throw new Error(`Invalid argument: ${value}. Must have a 'name' property.`);
  validateString(value.name);

  if (!value.url) throw new Error(`Invalid argument: ${value}. Must have a 'url' property.`);
  validateUrl(value.url);

  return true;
}

// Only validates duplicity due to every other valdiation which requires this one, has a particular need to treat other errors
export function validateSubDocArraysDuplicity(array: Array<SubDocument>): true {
  const ids = new Set();
  const names = new Set();
  const urls = new Set();
  for (const document of array) {
    if (ids.has(document.id) || names.has(document.name) || urls.has(document.url)) {
      throw new Error('Input Array must not have duplicate property values between sub documents');
    }
    ids.add(document.id);
    names.add(document.name);
    urls.add(document.url);
  }

  return true;
}

export function validateStringArray(array: Array<string>): true {
  if (!(Array.isArray(array) && array.length >= 1))
    throw new Error('Argument must be an array with at least one element');

  for (const element of array) {
    try {
      validateString(element);
    } catch (error) {
      const err = error as Error;
      throw new Error(`Invalid element "${element}": ${err.message}`);
    }
  }

  if (!(new Set(array).size === array.length)) throw new Error('Must not be duplicated elements');

  return true;
}
