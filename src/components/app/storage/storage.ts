import products from './data/products';

import { ProductItem } from '../../../models/product-item.model';

class Storage {
  #allProducts: ProductItem[] = [];
  #selectedProducts: ProductItem[] = [];
  #currentProduct: ProductItem | null = null;

  init(): void {
    this.setAllProducts(products);
  }

  setAllProducts(products: ProductItem[]): void {
    this.#allProducts = products;
  }

  getAllProducts(): ProductItem[] {
    return this.#allProducts;
  }

  setCurrentProduct(currentProduct: ProductItem | null): void {
    this.#currentProduct = currentProduct;
  }

  getCurrentProduct(): ProductItem | null {
    return this.#currentProduct;
  }

  setSelectedProducts(selectedProducts: ProductItem[]): void {
    this.#selectedProducts = selectedProducts;
  }

  getSelectedProducts(): ProductItem[] {
    return this.#selectedProducts;
  }
}

export default new Storage();
