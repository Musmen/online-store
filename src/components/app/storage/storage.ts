import products from './data/products.js';

import { ProductItem } from '../../../models/product-item.model';

class Storage {
  #products: ProductItem[] = [];

  init(): void {
    this.setProducts(products);
  }

  setProducts(products: ProductItem[]): void {
    this.#products = products;
  }

  getProducts(): ProductItem[] {
    return this.#products;
  }
}

export default new Storage();
