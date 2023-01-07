import { ProductItem } from './product-item.model';

export interface Category {
  name: keyof ProductItem;
  value: string | number;
}

export interface QueryParams {
  [queryParam: string]: string;
}

export interface ProductsCount {
  total: number;
  current: number;
}

export interface MinMaxRange {
  min: number;
  max: number;
}

export type GetMinAndMaxPropertyValuesInProductsType = (
  products: ProductItem[],
  property: keyof ProductItem
) => MinMaxRange;
