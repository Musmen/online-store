import { ProductItem } from '../models/product-item.model';

export const DEFAULT_ERROR_MESSAGE = 'API request error...';

export const ROMAN_DIGITS = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export const NATIONS_VALUES: string[] = ['ussr', 'germany', 'uk', 'usa'];
export const TYPES_VALUES: string[] = ['lightTank', 'mediumTank', 'heavyTank', 'AT-SPG'];

export const SEPARATOR = ' ';

export enum SORTING_ORDERS {
  ASC = 'asc',
  DES = 'des',
}

export enum SORTING_BY {
  PRICE = 'price',
  AMOUNT = 'amount',
  TIER = 'tier',
}

export const PRICE_POSTFIX = '$';

export const PRODUCTS_PROPERTIES_NAMES: {
  [keys: string]: keyof ProductItem;
} = {
  PRICE: 'price',
  AMOUNT: 'amount',
};
