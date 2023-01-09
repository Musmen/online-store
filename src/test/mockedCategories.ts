import { Category } from '../models/common.model';

export const testTypeCategoriesList: Category[] = [
  {
    name: 'type',
    value: 'lightTank',
  },
  {
    name: 'type',
    value: 'mediumTank',
  },
  {
    name: 'type',
    value: 'heavyTank',
  },
  {
    name: 'type',
    value: 'no such tank',
  },
  {
    name: 'type',
    value: 'AT-SPG',
  },
];

export const testNationCategoriesList: Category[] = [
  {
    name: 'nation',
    value: 'ussr',
  },
  {
    name: 'nation',
    value: 'germany',
  },
  {
    name: 'nation',
    value: 'usa',
  },
  {
    name: 'nation',
    value: 'no such nation',
  },
  {
    name: 'nation',
    value: 'uk',
  },
];

export const testMixedCategoriesList: Category[] = [
  {
    name: 'nation',
    value: 'ussr',
  },
  {
    name: 'type',
    value: 'mediumTank',
  },
  {
    name: 'name',
    value: 'FV201 (A45)',
  },
  {
    name: 'nation',
    value: 'uk',
  },
  {
    name: 'amount',
    value: 30,
  },
  {
    name: 'description',
    value: 'no description',
  },
  {
    name: 'price',
    value: 31,
  },
];
