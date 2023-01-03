import storage from '../components/app/storage/storage';

import queryParamsService from './query-params.service';

import { hasSomeValues } from './common/services.helpers';
import { NATIONS_VALUES, TYPES_VALUES } from '../common/common.constants';

import { ProductItem } from '../models/product-item.model';
import { Category, ProductsCount } from '../models/common.model';

class ProductsService {
  #currentProduct: ProductItem | null = null;

  setCurrentProduct(product: ProductItem | null): void {
    this.#currentProduct = product;
  }

  getCurrentProduct(): ProductItem | null {
    return this.#currentProduct;
  }

  updateCurrentProduct(productId = ''): void {
    const currentProduct = this.findProductById(productId) || null;
    this.setCurrentProduct(currentProduct);
  }

  getAllProducts(): ProductItem[] {
    return storage.getProducts();
  }

  getFilteredProducts(): ProductItem[] {
    const { nation, type, search } = queryParamsService.getQueryParams();
    const checkedNationsList = nation?.split(' ') || NATIONS_VALUES;
    const checkedTypesList = type?.split(' ') || TYPES_VALUES;

    return this.getAllProducts().filter((product: ProductItem) => {
      const productForSearch: Partial<ProductItem> = { ...product };
      delete productForSearch.id;
      delete productForSearch.images;
      const productForSearchPropertiesValues = Object.values(productForSearch);

      return (
        checkedNationsList.includes(product.nation) &&
        checkedTypesList.includes(product.type) &&
        (search ? hasSomeValues(productForSearchPropertiesValues, search) : true)
      );
    });
  }

  findProductById(id: string): ProductItem | undefined {
    const products: ProductItem[] = this.getAllProducts();
    return products.find((product: ProductItem) => id === String(product.id));
  }

  #countCategoryItemsInProducts(category: Category, products: ProductItem[]): number {
    const { name, value } = category;
    return products.filter((product: ProductItem) => product[name] === value).length;
  }

  getCategoryItemsCount(category: Category): ProductsCount {
    const allProducts: ProductItem[] = this.getAllProducts();
    const filteredProducts: ProductItem[] = this.getFilteredProducts();

    const totalCount = this.#countCategoryItemsInProducts(category, allProducts);
    const currentCount = this.#countCategoryItemsInProducts(category, filteredProducts);

    return { total: totalCount, current: currentCount };
  }
}

export default new ProductsService();
