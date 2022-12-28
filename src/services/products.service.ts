import storage from '../components/app/storage/storage';
import { ProductItem } from '../models/product-item.model';

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

  getProducts(): ProductItem[] {
    return storage.getProducts();
  }

  findProductById(id: string): ProductItem | undefined {
    const products: ProductItem[] = this.getProducts();
    return products.find((product: ProductItem) => id === String(product.id));
  }
}

export default new ProductsService();
