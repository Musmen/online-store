import { fetchProducts } from '../../../services/api.service';

class Storage {
  products: unknown[] = [];

  setProducts(products: unknown[]): void {
    this.products = products;
  }

  getProducts(): unknown[] {
    return this.products;
  }

  async init(): Promise<void> {
    const products: unknown[] = await fetchProducts();
    this.setProducts(products);
  }
}

export default new Storage();
