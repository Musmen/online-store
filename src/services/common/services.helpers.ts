import { getMinAndMaxPropertyValuesInProducts } from '../../common/common.helper';

import { MinMaxRange } from '../../models/common.model';
import { ProductItem } from '../../models/product-item.model';
import { MinMaxTupleType } from '../models/services.models';

type hasSomeValuesType = (forSearchValuesList: unknown[], searchValue: string) => boolean;

export const hasSomeValues: hasSomeValuesType = (forSearchValuesList: unknown[], searchValue: string) =>
  forSearchValuesList.some((forSearchValue) =>
    String(forSearchValue).toLowerCase().includes(searchValue.toLowerCase())
  );

type getMinMaxTupleOfPropertyValuesInProductsType = (
  products: ProductItem[],
  property: keyof ProductItem
) => MinMaxTupleType;

export const getMinMaxTupleOfPropertyValuesInProducts: getMinMaxTupleOfPropertyValuesInProductsType = (
  products: ProductItem[],
  property: keyof ProductItem
) => {
  const propertyLimits: MinMaxRange = getMinAndMaxPropertyValuesInProducts(products, property);

  return [propertyLimits.min || 0, propertyLimits.max || 0];
};
