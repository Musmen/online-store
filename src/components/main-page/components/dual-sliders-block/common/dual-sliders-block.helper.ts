import productsService from '../../../../../services/products.service';
import queryParamsService from '../../../../../services/query-params.service';

import { getMinAndMaxPropertyValuesInProducts } from '../../../../../common/common.helper';

import { PRODUCTS_PROPERTIES_NAMES, SEPARATOR } from '../../../../../common/common.constants';

import { ProductItem } from '../../../../../models/product-item.model';
import { MinMaxRange } from '../../../../../models/common.model';

export const getLimitsPricesInAllProducts: () => MinMaxRange = () => {
  const allProducts: ProductItem[] = productsService.getAllProducts();
  return getMinAndMaxPropertyValuesInProducts(allProducts, PRODUCTS_PROPERTIES_NAMES.PRICE);
};

export const getLimitsAmountsInAllProducts: () => MinMaxRange = () => {
  const allProducts: ProductItem[] = productsService.getAllProducts();
  return getMinAndMaxPropertyValuesInProducts(allProducts, PRODUCTS_PROPERTIES_NAMES.AMOUNT);
};

export const getLimitsPricesInSelectedProducts: () => MinMaxRange = () => {
  const selectedProducts: ProductItem[] = productsService.getSelectedProducts();
  if (selectedProducts.length)
    return getMinAndMaxPropertyValuesInProducts(selectedProducts, PRODUCTS_PROPERTIES_NAMES.PRICE);

  const { price } = queryParamsService.getQueryParams();
  if (!price) return getLimitsPricesInAllProducts();

  const [minPrice, maxPrice] = price.split(SEPARATOR);
  return { min: Number(minPrice), max: Number(maxPrice) };
};

export const getLimitsAmountsInSelectedProducts: () => MinMaxRange = () => {
  const selectedProducts: ProductItem[] = productsService.getSelectedProducts();
  if (selectedProducts.length)
    return getMinAndMaxPropertyValuesInProducts(selectedProducts, PRODUCTS_PROPERTIES_NAMES.AMOUNT);

  const { amount } = queryParamsService.getQueryParams();
  if (!amount) return getLimitsPricesInAllProducts();

  const [minAmount, maxAmount] = amount.split(SEPARATOR);
  return { min: Number(minAmount), max: Number(maxAmount) };
};
