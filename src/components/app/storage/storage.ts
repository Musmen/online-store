import products from './data/products';

import { ProductItem } from '../../../models/product-item.model';

class Storage {
  products: ProductItem[] = [];

  setProducts(products: ProductItem[]): void {
    this.products = products;
  }

  getProducts(): ProductItem[] {
    return this.products;
  }

  init(): void {
    this.setProducts(products);
  }
}

export default new Storage();
