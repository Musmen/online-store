import { MinMaxRange } from '../models/common.model';
import { MinMaxTupleType } from '../services/models/services.models';

export const minMaxPropertiesForProductsOnlyWithNumericProperties: {
  [key: string]: MinMaxRange;
} = {
  price: { min: 26, max: 65 },
  amount: { min: 10, max: 67 },
  tier: { min: 1, max: 10 },
};

export const minMaxPropertiesTuplesForProductsOnlyWithNumericProperties: {
  [key: string]: MinMaxTupleType;
} = {
  price: [26, 65],
  amount: [10, 67],
  tier: [1, 10],
};
