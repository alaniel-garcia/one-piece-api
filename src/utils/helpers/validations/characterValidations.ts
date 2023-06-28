import type { HakiAbilityName, LuffyDevilFruitSubDoc, Status, SubDocument } from 'types';
import {
  validateNonEmptyString,
  validateString,
  validateStringArray,
  validateSubDoc,
  validateSubDocArraysDuplicity
} from '.';
import { validateDevilFruitName } from './devilFruitValidations';
import { validateHakiAbilityName } from './hakiAbilityValidations';

export function validateStatus(value: Status): true {
  const VALID_STATUSES = ['Alive', 'Deceased', 'Unknown'];
  validateString(value);

  if (!VALID_STATUSES.includes(value)) throw new Error('Status only can be either "Alive", "Deceased" or "Unknown"');

  return true;
}

export function validateBirthday(value: string): true {
  validateString(value);

  const regexBirthday =
    /^(January|February|March|April|May|June|July|August|September|October|November|December)\s([1-9]|[1-2][0-9]|3[0-1])$/i;

  if (!regexBirthday.test(value))
    throw new Error(
      'Invalid birthday format. Provide a valid date in the format "Month Name Day", where Month Name is the name of a month (January to December) and Day is a number between 1 and 31'
    );

  return true;
}

export function validateCharacterDevilFruit(value: LuffyDevilFruitSubDoc | SubDocument | Array<SubDocument>): true {
  if (Array.isArray(value)) {
    if (!(value.length >= 2)) throw new Error('Input devil fruit must be an array of at least 2 elements');

    value.forEach((element) => {
      validateSubDoc(element);
      validateDevilFruitName(element.name);
    });

    validateSubDocArraysDuplicity(value);
  } else {
    validateSubDoc(value);
    validateDevilFruitName(value.name);

    if (value.id === 1) {
      if ('alias' in value) {
        if (!(value.alias === 'Gomu Gomu no Mi' && value.name === 'Hito Hito no Mi, Model: Nika'))
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          throw new Error(
            `For luffy's devil fruit: name must be 'Hito Hito no Mi, Model: Nika'. Received: ${value.name}. And only valid alias is the string "Gomu Gomu no Mi". Received: ${value.alias}`
          );
      } else {
        throw new Error('Devil fruit of id 1 belongs to "Monkey D. Luffy". Argument must have "alias" property');
      }
    }
  }

  return true;
}

export function validateCharacterHakiAbilities(value: Array<SubDocument>): true {
  if (!(Array.isArray(value) && value.length >= 1 && value.length <= 3))
    throw new Error('Haki abilities array must have between 1 and 3 elements');

  value.forEach((element) => {
    validateSubDoc(element);
    validateHakiAbilityName(element.name as HakiAbilityName);
  });

  validateSubDocArraysDuplicity(value);
  return true;
}

export function validateBounties(value: Array<string>): true {
  const BOUNTY_REGEX = /^(?!0)\d{1,3}(,\d{3})*$/;

  if (!(Array.isArray(value) && value.length >= 1))
    throw new Error('Argument must be an array with at least one element');

  if (!(new Set(value).size === value.length)) throw new Error('Must not be duplicated elements');

  if (!value.every((element) => BOUNTY_REGEX.test(element))) {
    throw new Error(
      'Bounties must be a string that represents a number, with commas as the thousand separator, and must not start with a zero'
    );
  }

  if (
    !value.every((element, index) => {
      if (index === 0) return true;

      return Number(element.replace(/,/g, '')) < Number(value[index - 1].replace(/,/g, ''));
    })
  ) {
    throw new Error('Bounties must be sorted descending');
  }

  return true;
}

export function validateHeight(value: string): true {
  const HEIGHT_REGEX = /^\d+\.\d{2}$/;

  validateNonEmptyString(value);

  if (/[A-Za-z]/.test(value)) throw new Error('Height must include only number characters');

  if (!HEIGHT_REGEX.test(value))
    throw new Error('Height must have an integer(0 included) part followed by 2 decimals.');

  return true;
}

export function validateDebut(value: Array<string>): true {
  const ALPHABET = /^[A-Za-z]/;
  if (!Array.isArray(value) || value.length !== 2) throw new Error('Debut argument must be an array of two elements');

  validateStringArray(value);

  // test the regex instead of use validadNonEmptyString function in order to validate no numbers at the beginning of each element
  if (!(ALPHABET.test(value[0]) && ALPHABET.test(value[1]))) throw new Error('Both debut elements must be strings');

  if (!(/^(Episode)\s(?!0)\d+$/i.test(value[1]) && /^(Chapter)\s(?!0)\d+$/i.test(value[0]))) {
    throw new Error(
      'Debut elements must follow "Chapter + number" and "Episode + number" pattern, respectively; number cannot be zero'
    );
  }

  return true;
}

export function validateBackstory(value: string): true {
  validateString(value);

  const words = value.split(' ');

  if (!(words.length >= 50 && words.length <= 230))
    throw new Error(`Invalid backstory length. Must be between 50 and 230 words. Received: ${words.length}`);
  return true;
}
