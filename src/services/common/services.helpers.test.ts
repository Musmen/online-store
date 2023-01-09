import { getMinMaxTupleOfPropertyValuesInProducts, hasSomeValues } from './services.helpers';

import { mockedProductsOnlyWithNumericProperties, mockedProductsWithInvalidData } from '../../test/mockedProducts';
import { minMaxPropertiesTuplesForProductsOnlyWithNumericProperties } from '../../test/mockedCommonData';

import { ProductItem } from '../../models/product-item.model';
import { MinMaxTupleType } from '../models/services.models';

describe('Testing hasSomeValues function from "src/services/common/services.helpers.ts"', () => {
  const testSearchValuesList: Array<string | number> = [45, 'try find Me', 'AnD Me', 'ME ALSO', '0', 0];
  const testIncludedValues: string[] = ['45', 'TRY FIND ME', 'aND me', 'AND ME', 'me also', '0'];
  const testNotIncludedValues: string[] = ['454', '7 TRY FIND ME 7', 'asd', '00', 'zero', 'noupe'];

  test('Correctly finds values', () => {
    testIncludedValues.forEach((testSearchValue: string) => {
      expect(hasSomeValues(testSearchValuesList, testSearchValue)).toBe(true);
    });
  });

  test('Returns false for not included values', () => {
    testNotIncludedValues.forEach((testSearchValue: string) => {
      expect(hasSomeValues(testSearchValuesList, testSearchValue)).toBe(false);
    });
  });

  test('Returns false for empty search values list', () => {
    testIncludedValues.forEach((testSearchValue: string) => {
      expect(hasSomeValues([], testSearchValue)).toBe(false);
    });
  });
});

describe('Testing getMinMaxTupleOfPropertyValuesInProducts function from "src/services/common/services.helpers.ts"', () => {
  const PRODUCT_PROPERTIES_WITH_NUMERIC_VALUES = ['price', 'amount', 'tier'] as Array<keyof ProductItem>;

  test('Correctly gets min and max tuples of numeric properties values in products', () => {
    PRODUCT_PROPERTIES_WITH_NUMERIC_VALUES.forEach((productPropertyWithNumericValues) => {
      const result: MinMaxTupleType = getMinMaxTupleOfPropertyValuesInProducts(
        mockedProductsOnlyWithNumericProperties,
        productPropertyWithNumericValues
      );

      const [min, max] = result;
      expect(min).toBeLessThanOrEqual(max);
      expect(max).toBeGreaterThanOrEqual(min);

      expect(result).toEqual(
        minMaxPropertiesTuplesForProductsOnlyWithNumericProperties[productPropertyWithNumericValues]
      );
    });
  });

  test('Returns zero min and max tuples on invalid products data', () => {
    const ZERO_MIN_AND_MAX_RESULT: MinMaxTupleType = [0, 0];

    PRODUCT_PROPERTIES_WITH_NUMERIC_VALUES.forEach((productPropertyWithNumericValues) => {
      const result: MinMaxTupleType = getMinMaxTupleOfPropertyValuesInProducts(
        mockedProductsWithInvalidData,
        productPropertyWithNumericValues
      );

      expect(result).not.toBeFalsy();
      expect(result).toEqual(ZERO_MIN_AND_MAX_RESULT);
    });
  });
});
