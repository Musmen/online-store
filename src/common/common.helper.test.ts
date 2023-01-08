import { convertToRomane, getMinAndMaxPropertyValuesInProducts } from './common.helper';

import {
  minMaxPropertiesForProductsOnlyWithNumericProperties,
  mockedProductsOnlyWithNumericProperties,
  mockedProductsWithInvalidData,
} from '../test/mockedTestData';

import { MinMaxRange } from '../models/common.model';
import { ProductItem } from '../models/product-item.model';

describe('Testing convertToRomane function from "src/common/common.helper.ts"', () => {
  const ROMAN_DIGITS = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  test('Correctly converts number to Romane', () => {
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

describe('Testing getMinAndMaxPropertyValuesInProducts function from "src/common/common.helper.ts"', () => {
  const PRODUCT_PROPERTIES_WITH_NUMERIC_VALUES = ['price', 'amount', 'tier'] as Array<keyof ProductItem>;

  test('Correctly gets min and max sets of numeric properties values in products', () => {
    PRODUCT_PROPERTIES_WITH_NUMERIC_VALUES.forEach((productPropertyWithNumericValues) => {
      const result: MinMaxRange = getMinAndMaxPropertyValuesInProducts(
        mockedProductsOnlyWithNumericProperties,
        productPropertyWithNumericValues
      );

      expect(result.min).toBeLessThanOrEqual(result.max);
      expect(result.max).toBeGreaterThanOrEqual(result.min);
      expect(result).toEqual(minMaxPropertiesForProductsOnlyWithNumericProperties[productPropertyWithNumericValues]);
    });
  });

  test('Correctly returns zero min and max sets on invalid products data', () => {
    const ZERO_MIN_AND_MAX_RESULT: MinMaxRange = { min: 0, max: 0 };

    PRODUCT_PROPERTIES_WITH_NUMERIC_VALUES.forEach((productPropertyWithNumericValues) => {
      const result: MinMaxRange = getMinAndMaxPropertyValuesInProducts(
        mockedProductsWithInvalidData,
        productPropertyWithNumericValues
      );

      expect(result).not.toBeFalsy();
      expect(result).toEqual(ZERO_MIN_AND_MAX_RESULT);
    });
  });
});
