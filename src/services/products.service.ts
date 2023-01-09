import storage from '../components/app/storage/storage';

import queryParamsService from './query-params.service';

import { getMinMaxTupleOfPropertyValuesInProducts, hasSomeValues } from './common/services.helpers';

import {
  NATIONS_VALUES,
  PRODUCTS_PROPERTIES_NAMES,
  SEPARATOR,
  SORTING_BY,
  SORTING_ORDERS,
  TYPES_VALUES,
} from '../common/common.constants';

import { ProductItem } from '../models/product-item.model';
import { Category, ProductsCount } from '../models/common.model';
import { MinMaxTupleType } from './models/services.models';

class ProductsService {
  getAllProducts(): ProductItem[] {
    return storage.getAllProducts();
  }

  findProductById(id: string): ProductItem | undefined {
    const products: ProductItem[] = this.getAllProducts();
    return products.find((product: ProductItem) => id === String(product.id));
  }

  setCurrentProduct(product: ProductItem | null): void {
    storage.setCurrentProduct(product);
  }

  getCurrentProduct(): ProductItem | null {
    return storage.getCurrentProduct();
  }

  updateCurrentProduct(productId = ''): void {
    const currentProduct = this.findProductById(productId) || null;
    this.setCurrentProduct(currentProduct);
  }

  getSelectedProducts(): ProductItem[] {
    return storage.getSelectedProducts();
  }

  getSelectedProductsAmount(): number {
    return this.getSelectedProducts().length;
  }

  setSelectedProducts(selectedProducts: ProductItem[] = []): void {
    storage.setSelectedProducts(selectedProducts);
  }

  getFilteredProducts(products: ProductItem[]): ProductItem[] {
    const { nation, type, search, price, amount } = queryParamsService.getQueryParams();
    const checkedNationsList = nation?.split(SEPARATOR) || NATIONS_VALUES;
    const checkedTypesList = type?.split(SEPARATOR) || TYPES_VALUES;

    const priceMinMaxTuple: MinMaxTupleType = getMinMaxTupleOfPropertyValuesInProducts(
      products,
      PRODUCTS_PROPERTIES_NAMES.PRICE
    );
    const amountMinMaxTuple: MinMaxTupleType = getMinMaxTupleOfPropertyValuesInProducts(
      products,
      PRODUCTS_PROPERTIES_NAMES.AMOUNT
    );

    const [minPrice, maxPrice] = price?.split(SEPARATOR) || priceMinMaxTuple;
    const [minAmount, maxAmount] = amount?.split(SEPARATOR) || amountMinMaxTuple;

    return products.filter((product: ProductItem) => {
      const productForSearch: Partial<ProductItem> = { ...product };
      delete productForSearch.id;
      delete productForSearch.images;
      const productForSearchPropertiesValues = Object.values(productForSearch);

      return (
        checkedNationsList.includes(product.nation) &&
        checkedTypesList.includes(product.type) &&
        Number(product.price) >= Number(minPrice) &&
        Number(product.price) <= Number(maxPrice) &&
        Number(product.amount) >= Number(minAmount) &&
        Number(product.amount) <= Number(maxAmount) &&
        (search ? hasSomeValues(productForSearchPropertiesValues, search) : true)
      );
    });
  }

  getSortedProducts(products: ProductItem[]): ProductItem[] {
    const { sorting } = queryParamsService.getQueryParams();
    if (!sorting) return products;

    const [sortingBy, sortingOrder] = sorting.split(SEPARATOR) as [SORTING_BY, SORTING_ORDERS];
    return [...products].sort(
      (firstProduct: ProductItem, secondProduct: ProductItem) =>
        (Number(firstProduct[sortingBy]) - Number(secondProduct[sortingBy])) *
        (sortingOrder === SORTING_ORDERS.ASC ? 1 : -1)
    );
  }

  updateSelectedProducts(): void {
    const allProducts: ProductItem[] = this.getAllProducts();
    const filteredProducts: ProductItem[] = this.getFilteredProducts(allProducts);
    const sortedAndFilteredProducts: ProductItem[] = this.getSortedProducts(filteredProducts);
    this.setSelectedProducts(sortedAndFilteredProducts);
  }

  countCategoryItemsInProducts(category: Category, products: ProductItem[]): number {
    const { name, value } = category;
    return products.filter((product: ProductItem) => product[name] === value).length;
  }

  getCategoryItemsCount(category: Category): ProductsCount {
    const allProducts: ProductItem[] = this.getAllProducts();
    const selectedProducts: ProductItem[] = this.getSelectedProducts();

    const totalCount = this.countCategoryItemsInProducts(category, allProducts);
    const currentCount = this.countCategoryItemsInProducts(category, selectedProducts);

    return { total: totalCount, current: currentCount };
  }
}

export default new ProductsService();
