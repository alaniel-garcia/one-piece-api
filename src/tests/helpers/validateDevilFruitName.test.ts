import { validateDevilFruitName } from '@utils/helpers/validations';
const errorMessage =
  'Devil Fruit name needs the first two words to be the same, and followed by "no Mi" examples: "Gomu Gomu no Mi", "Gura Gura no Mi", "Hito Hito no Mi, Model: Nika". Not allowed examples: "Gura gura no Mi", "Gomu no Mi", "Gomu Gomu mi no", "Mera Mera no mi"';

describe('validateDevilFruit function', () => {
  it('should return true on a valid devil fruit name', () => {
    expect(validateDevilFruitName('Gomu Gomu no Mi')).toBe(true);
    expect(validateDevilFruitName('Hito Hito no Mi, Model: Nika')).toBe(true);
  });

  describe('Invalid devil fruit names', () => {
    it('should throw error if no repeated first two words', () => {
      expect(() => validateDevilFruitName('Gomu gomu no Mi')).toThrow(errorMessage);
      expect(() => validateDevilFruitName('Gomu GOMu no Mi')).toThrow(errorMessage);
      expect(() => validateDevilFruitName('Gomu no Mi')).toThrow(errorMessage);
    });
    it('should throw error if there is not a "no Mi" after first two words', () => {
      expect(() => validateDevilFruitName('Gura Gura no no Mi')).toThrow(errorMessage);
      expect(() => validateDevilFruitName('Gura Gura Gura no Mi')).toThrow(errorMessage);
    });
    it('should throw error if "no Mi" is not correctly capitalized', () => {
      expect(() => validateDevilFruitName('Mera Mera no mi')).toThrow(errorMessage);
    });
  });
});
