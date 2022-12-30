import storage from '../components/app/storage/storage';

import queryParamsService from './query-params.service';

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
    const { nation, type } = queryParamsService.getQueryParams();
    const checkedNationsList = nation?.split(' ') || ['ussr', 'germany', 'uk', 'usa'];
    const checkedTypesList = type?.split(' ') || ['lightTank', 'mediumTank', 'heavyTank', 'AT-SPG'];

    return this.getAllProducts().filter(
      (product: ProductItem) => checkedNationsList.includes(product.nation) && checkedTypesList.includes(product.type)
    );
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
