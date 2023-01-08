import { ProductItem } from '../models/product-item.model';

export interface MockedStorage {
  currentProduct: ProductItem | null;
  selectedProducts: ProductItem[];
  setCurrentProduct(currentProduct: ProductItem | null): void;
  getCurrentProduct(): ProductItem | null;
  setSelectedProducts(selectedProducts: ProductItem[]): void;
  getSelectedProducts(): ProductItem[];
}

export const mockedStorage: MockedStorage = {
  currentProduct: null,
  selectedProducts: [],
  setCurrentProduct: function (product: ProductItem) {
    this.currentProduct = product;
  },
  getCurrentProduct: function () {
    return this.currentProduct;
  },
  setSelectedProducts(selectedProducts: ProductItem[]): void {
    this.selectedProducts = selectedProducts;
  },
  getSelectedProducts(): ProductItem[] {
    return this.selectedProducts;
  },
};
