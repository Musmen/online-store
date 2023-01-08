import { convertToRomane } from './common.helper';

describe('Testing convertToRomane function', () => {
  const ROMAN_DIGITS = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  test('Correctly convert number to Romane', () => {
    for (let input = 1; input < ROMAN_DIGITS.length; input++) {
      expect(convertToRomane(input)).toBe(ROMAN_DIGITS[input]);
    }
  });

  test('Returns false value on invalid input', () => {
    expect(convertToRomane(0)).toBeFalsy();
    expect(convertToRomane(11)).toBeFalsy();
    expect(convertToRomane('incorrect input')).toBeFalsy();
  });
});
