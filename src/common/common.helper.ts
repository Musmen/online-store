import { DEFAULT_ERROR_MESSAGE, ROMAN_DIGITS } from './common.constants';

import { ProductItem } from '../models/product-item.model';
import { GetMinAndMaxPropertyValuesInProductsType } from '../models/common.model';

export const fetchData = async <T>(url: string) => {
  const response: Response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText || DEFAULT_ERROR_MESSAGE);
  const result: T = await response.json();
  return result;
};

export const convertToRomane = (number: number | string): string => ROMAN_DIGITS[Number(number)];

export const getMinAndMaxPropertyValuesInProducts: GetMinAndMaxPropertyValuesInProductsType = (
  products: ProductItem[],
  property: keyof ProductItem
) => {
  const productsPropertyValues: number[] = products.map((product: ProductItem) => Number(product[property]));

  return { min: Math.min(...productsPropertyValues), max: Math.max(...productsPropertyValues) };
};
