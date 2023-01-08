import { MinMaxRange } from '../models/common.model';
import { ProductItem } from '../models/product-item.model';

export const mockedProductsOnlyWithNumericProperties = [
  {
    price: 51.5,
    amount: 19,
    tier: 1,
  },
  {
    price: 59.5,
    amount: 67,
    tier: 5,
  },
  {
    price: 65,
    amount: 30,
    tier: 7,
  },
  {
    price: 26,
    amount: 10,
    tier: 10,
  },
  {
    price: 31,
    amount: 59,
    tier: 10,
  },
] as ProductItem[];

export const minMaxPropertiesForProductsOnlyWithNumericProperties: {
  [key: string]: MinMaxRange;
} = {
  price: { min: 26, max: 65 },
  amount: { min: 10, max: 67 },
  tier: { min: 1, max: 10 },
};

export const mockedProductsWithInvalidData = [
  {
    price: NaN,
    amount: NaN,
    tier: NaN,
  },
  {
    price: 'sdfsdf',
    amount: '43x34',
    tier: undefined,
  },
  {
    price: '15px',
    amount: 'invalid',
    tier: 'zero',
  },
] as ProductItem[];
