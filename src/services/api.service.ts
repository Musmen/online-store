import { getEndpointUrl } from './common/services.helper';
import { fetchData } from '../common/common.helper';

import { MAIN_API_URLS } from './common/services.constants';

import { ProductsResponse } from '../models/API-response.model';

export const fetchProducts = async (productsLimit: string | number = 100) => {
  const endpointUrl = getEndpointUrl(MAIN_API_URLS.PRODUCTS);
  const response = await fetchData<ProductsResponse>(`${endpointUrl}?limit=${productsLimit}`);
  return response.products;
};
