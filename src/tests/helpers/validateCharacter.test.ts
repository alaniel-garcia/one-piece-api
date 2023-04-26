import {
  validateStatus,
  validateBirthday,
  validateCharacterDevilFruit,
  validateCharacterHakiAbilities,
  validateBounties,
  validateHeight,
  validateFirstAppearance,
  validateBackstory
} from '@utils/helpers/validations/characterValidations';
import type { LuffyDevilFruitSubDoc, Status, SubDocument } from 'types';

describe('Specific validation functions for character', () => {
  describe('validateStatus function', () => {
    it('should return on valid statuses', () => {
      expect(validateStatus('Alive')).toBe(true);
      expect(validateStatus('Deceased')).toBe(true);
      expect(validateStatus('Unknown')).toBe(true);
    });
    it('should throw error on invalid statuses', () => {
      const errorMessage = 'Status only can be either "Alive", "Deceased" or "Unknown"';
      expect(() => validateStatus('' as Status)).toThrowError();
      expect(() => validateStatus(1235314 as unknown as Status)).toThrowError();
      expect(() => validateStatus('  Deceased' as Status)).toThrowError();
      expect(() => validateStatus('alive   ' as Status)).toThrowError();
      expect(() => validateStatus('Unknown   ' as Status)).toThrowError(errorMessage);
      expect(() => validateStatus('Dead' as Status)).toThrowError(errorMessage);
    });
  });
  describe('validateBirthday function', () => {
    const errorMessage =
      'Invalid birthday format. Provide a valid date in the format "Month Name Day", where Month Name is the name of a month (January to December) and Day is a number between 1 and 31';

    it('should return true on valid birthday format', () => {
      expect(validateBirthday('May 5')).toBe(true);
      expect(validateBirthday('November 11')).toBe(true);
      expect(validateBirthday('October 6')).toBe(true);
      expect(validateBirthday('July 31')).toBe(true);
    });
    it('should throw error on invalid name month', () => {
      expect(() => validateBirthday('InvalidMonthName 1')).toThrowError(errorMessage);
      expect(() => validateBirthday('january 10')).toThrowError();
    });
    it('should throw error when invalid day number is provided', () => {
      expect(() => validateBirthday('September 05')).toThrowError(errorMessage);
      expect(() => validateBirthday('December 100')).toThrowError(errorMessage);
      expect(() => validateBirthday('February 00')).toThrowError(errorMessage);
      expect(() => validateBirthday('June 32')).toThrowError(errorMessage);
    });
  });
  describe('validateCharacterDevilFruit function', () => {
    let luffySubDoc = {} as unknown as LuffyDevilFruitSubDoc;

    const validSubDocs = [
      {
        id: 2,
        name: 'Gura Gura no Mi',
        url: 'https://www.onepieceapi.net/api/devil_fruit/2'
      },
      {
        id: 3,
        name: 'Mera Mera no Mi',
        url: 'https://www.onepieceapi.net/api/devil_fruit/3'
      }
    ];

    describe('Luffy devil fruit sub doc', () => {
      beforeEach(() => {
        luffySubDoc = {
          id: 1,
          name: 'Hito Hito no Mi, Model: Nika',
          alias: 'Gomu Gomu no Mi',
          url: 'https://www.onepieceapi.net/api/devil_fruit/1'
        } as unknown as LuffyDevilFruitSubDoc;
      });
      it('should return true on valid Luffy devil fruit sub doc', () => {
        expect(validateCharacterDevilFruit(luffySubDoc)).toBe(true);
      });
      it('should throw error on invalid Luffy devil fruit name', () => {
        luffySubDoc.name = 'Gomu Gomu no Mi' as 'Hito Hito no Mi, Model: Nika';
        expect(() => validateCharacterDevilFruit(luffySubDoc)).toThrowError();
      });
      it('should throw error on invalid Luffy devil fruit alias', () => {
        luffySubDoc.alias = 'Hito Hito no Mi, Model: Nika' as 'Gomu Gomu no Mi';
        expect(() => validateCharacterDevilFruit(luffySubDoc)).toThrowError();
      });
    });

    describe('Normal devil fruit sub docs', () => {
      const invalidSubDocs = [
        {
          id: 2,
          name: 'Gura Gura no mi',
          url: 'https://www.onepieceapi.net/api/devil_fruit/2'
        },
        {
          id: 15,
          name: 'Gura Gura no Mi',
          url: 'https://www.onepieceapi.net/api/noValidCollection/15'
        },
        {
          id: 1,
          name: 'Gura Gura no Mi',
          url: 'https://www.onepieceapi.net/api/devil_fruit/1'
        },
        {
          name: 'Gura Gura no Mi',
          url: 'https://www.onepieceapi.net/api/devil_fruit/11'
        },
        {
          id: 500,
          url: 'https://www.onepieceapi.net/api/devil_fruit/500'
        },
        {
          id: 150,
          name: 'Gura Gura no Mi'
        }
      ] as Array<SubDocument>;

      it('should return true on valid devil fruit sub doc', () => {
        expect(validateCharacterDevilFruit(validSubDocs)).toBe(true);
        expect(validateCharacterDevilFruit(validSubDocs[0])).toBe(true);
        expect(validateCharacterDevilFruit(validSubDocs[1])).toBe(true);
      });
      it('should throw error on invalid devil fruit sub doc', () => {
        expect(() => validateCharacterDevilFruit(invalidSubDocs)).toThrowError();
        expect(() => validateCharacterDevilFruit([validSubDocs[0], validSubDocs[0]])).toThrowError(); // Valid docs but duplicity
        for (const element of invalidSubDocs) {
          expect(() => validateCharacterDevilFruit(element)).toThrowError();
        }
      });
    });
  });
  describe('validateCharacterHakiAbilities function', () => {
    let haki_abilities = [] as Array<SubDocument>;
    beforeEach(() => {
      haki_abilities = [
        {
          id: 1,
          name: 'Armament',
          url: 'https://www.onepieceapi.net/api/haki_ability/1'
        },
        {
          id: 2,
          name: 'Observation',
          url: 'https://www.onepieceapi.net/api/haki_ability/2'
        },
        {
          id: 3,
          name: 'Conqueror',
          url: 'https://www.onepieceapi.net/api/haki_ability/3'
        }
      ];
    });

    const VALID_HAKI_ABILITIES = ['Armament', 'Observation', 'Conqueror'];
    const errorMessages = [
      'Haki abilities array must have between 1 and 3 elements',
      `Every element requires a name that can only be either ${VALID_HAKI_ABILITIES.join(', ')}`
    ];

    it('should return true on valid haki abilities', () => {
      expect(validateCharacterHakiAbilities(haki_abilities)).toBe(true);
      expect(validateCharacterHakiAbilities([haki_abilities[0]])).toBe(true);
      expect(validateCharacterHakiAbilities([haki_abilities[1]])).toBe(true);
      expect(validateCharacterHakiAbilities([haki_abilities[2]])).toBe(true);
    });
    it('should throw an error on invalid haki abilities input size', () => {
      expect(() => validateCharacterHakiAbilities([])).toThrowError(errorMessages[0]);
      haki_abilities.push({
        id: 3,
        name: 'Conqueror',
        url: 'https://www.onepieceapi.net/api/haki_ability/3'
      });
      expect(() => validateCharacterHakiAbilities(haki_abilities)).toThrowError(errorMessages[0]);
    });
    it('should throw an error on invalid haki ability ids', () => {
      haki_abilities[0].id = 0;
      expect(() => validateCharacterHakiAbilities(haki_abilities)).toThrowError();
      haki_abilities[0].id = -1;
      expect(() => validateCharacterHakiAbilities(haki_abilities)).toThrowError();
    });
    it('should throw an error on invalid haki ability names', () => {
      haki_abilities[1].name = 'armament';
      expect(() => validateCharacterHakiAbilities(haki_abilities)).toThrowError(errorMessages[1]);
      haki_abilities[1].name = 'King';
      expect(() => validateCharacterHakiAbilities(haki_abilities)).toThrowError(errorMessages[1]);
    });
  });
  describe('validateBounties function', () => {
    const bounties = [
      '3,000,000,000',
      '1,500,000,000',
      '500,000,000',
      '400,000,000',
      '300,000,000',
      '100,000,000',
      '30,000,000'
    ] as Array<string>;
    it('should return true on valid bounties inputs', () => {
      expect(validateBounties(bounties)).toBe(true);
    });
    it('should throw error on invalid bounties inputs', () => {
      expect(() => validateBounties([])).toThrowError('Argument must be an array with at least one element');
      expect(() => validateBounties([''])).toThrowError(
        'Bounties must be a string that represents a number, with commas as the thousand separator, and must not start with a zero'
      );
      expect(() => validateBounties(['3,000,000,000', '3,000,000,000'])).toThrowError(
        'Must not be duplicated elements'
      );
      expect(() => validateBounties(['1,500,000,000', '3,000,000,000'])).toThrowError(
        'Bounties must be sorted descending'
      );
    });
  });
  describe('validateHeight function', () => {
    const errorMessages = [
      'Height must include only number characters',
      'Height must have an integer(0 included) part followed by 2 decimals.'
    ];

    it('should return true on valid height inputs', () => {
      expect(validateHeight('1.73')).toBe(true);
      expect(validateHeight('8.92')).toBe(true);
      expect(validateHeight('0.52')).toBe(true);
    });
    it('should throw error when invalid height inputs', () => {
      expect(() => validateHeight('sadasd')).toThrowError(errorMessages[0]);
      expect(() => validateHeight('5')).toThrowError(errorMessages[2]);
      expect(() => validateHeight('0.3')).toThrowError(errorMessages[2]);
      expect(() => validateHeight('0.356')).toThrowError(errorMessages[2]);
    });
  });
  describe('validateFirstAppearance function', () => {
    const errorMessages = [
      'First appearance argument must be an array of two elements',
      'First Appearance elements must follow "Episode + number" and "Chapter + number" pattern, respectively; number cannot be zero'
    ];
    it('should return true on valid first appearance input', () => {
      expect(validateFirstAppearance(['Episode 1', 'Chapter 1'])).toBe(true);
      expect(validateFirstAppearance(['Episode 1', 'Chapter 3'])).toBe(true);
    });
    it('should throw error when invalid height inputs', () => {
      expect(() => validateFirstAppearance(['episode 1', 'Chapter 1'])).toThrowError();
      expect(() => validateFirstAppearance(['Episode 1', 'chapter 1'])).toThrowError();
      expect(() => validateFirstAppearance(['', ''])).toThrowError();
      expect(() => validateFirstAppearance({} as unknown as Array<string>)).toThrowError(errorMessages[0]);
      expect(() => validateFirstAppearance(['Episode 1'])).toThrowError(errorMessages[0]);
      expect(() => validateFirstAppearance(['Episode 1', 'Chapter 1', 'extra string'])).toThrowError(errorMessages[0]);
      expect(() => validateFirstAppearance(['Chapter 1', 'Episode 1'])).toThrowError(errorMessages[1]);
      expect(() => validateFirstAppearance(['Chapter 0', 'Episode 1'])).toThrowError(errorMessages[1]);
      expect(() => validateFirstAppearance(['Chapter 1', 'Episode 0'])).toThrowError(errorMessages[1]);
      expect(() => validateFirstAppearance(['Chapter number 1', 'Episode number 1'])).toThrowError(errorMessages[1]);
    });
  });
  describe('validateBackstory function', () => {
    const backstory = `Monkey D. Luffy was born to Monkey D. Dragon, the leader of the Revolutionary Army, and an unknown mother in East Blue. Luffy's grandfather was Monkey D. Garp, a renowned Marine vice-admiral. As a child, Luffy was fascinated by pirates and dreamed of becoming the Pirate King. He ate the Gomu Gomu no Mi, a Devil Fruit that gave him rubber powers but also made him unable to swim.
      When Luffy was seven years old, he was befriended by Red-Haired Shanks, a pirate captain who frequented his hometown. Luffy looked up to Shanks and his crew, and often asked them to take him on their adventures. One day, while on board Shanks' ship, Luffy was attacked by a Sea King and lost his left arm. Shanks saved Luffy's life but lost his arm in the process. This event had a profound impact on Luffy, who vowed to become strong enough to protect his friends and fulfill his dream of becoming the Pirate King.`;
    const shorterBackstory = `Monkey D. Luffy was born to Monkey D. Dragon, the leader of the Revolutionary Army, and an unknown mother in East Blue. Luffy's grandfather was Monkey D. Garp, a renowned Marine vice-admiral. As a child, Luffy was fascinated by pirates and dreamed of becoming the Pirate King. He ate the Gomu Gomu no Mi, a Devil Fruit that gave him rubber powers but also made him unable to swim.`;
    const longerBackstory = `Monkey D. Luffy was born to Monkey D. Dragon, the leader of the Revolutionary Army, and an unknown mother in East Blue. Luffy's grandfather was Monkey D. Garp, a renowned Marine vice-admiral. As a child, Luffy was fascinated by pirates and dreamed of becoming the Pirate King. He ate the Gomu Gomu no Mi, a Devil Fruit that gave him rubber powers but also made him unable to swim.
      When Luffy was seven years old, he was befriended by Red-Haired Shanks, a pirate captain who frequented his hometown. Luffy looked up to Shanks and his crew, and often asked them to take him on their adventures. One day, while on board Shanks' ship, Luffy was attacked by a Sea King and lost his left arm. Shanks saved Luffy's life but lost his arm in the process. This event had a profound impact on Luffy, who vowed to become strong enough to protect his friends and fulfill his dream of becoming the Pirate King.
      When Luffy was seven years old, he was befriended by Red-Haired Shanks, a pirate captain who frequented his hometown. Luffy looked up to Shanks and his crew, and often asked them to take him on their adventures. One day, while on board Shanks' ship, Luffy was attacked by a Sea King and lost his left arm. Shanks saved Luffy's life but lost his arm in the process. This event had a profound impact on Luffy, who vowed to become strong enough to protect his friends and fulfill his dream of becoming the Pirate King.`;

    it('should return true on validate backstory input', () => {
      expect(validateBackstory(backstory)).toBe(true);
    });
    it('should throw error on invalid backstory inputs', () => {
      expect(() => validateBackstory(shorterBackstory)).toThrowError(
        `Invalid backstory length. Must be between 160 and 230 words. Received: ${shorterBackstory.split(' ').length}`
      );
      expect(() => validateBackstory(longerBackstory)).toThrowError(
        `Invalid backstory length. Must be between 160 and 230 words. Received: ${longerBackstory.split(' ').length}`
      );
    });
  });
});
