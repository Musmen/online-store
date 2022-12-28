import { ProductItem } from '../../../models/product-item.model';
import { CartComponent } from '../cart-page';
import '../scss/product-cart.style.scss';
import CartControl from './CartControl';
import Product from './Product';

class ProductCart {
  private root: HTMLElement | undefined;
  private containerRoot: HTMLElement | undefined;

  private product: ProductItem | undefined;
  private products: Product[] = [];

  private pagination: CartControl = new CartControl();
  private controller: CartComponent;

  public constructor(controller: CartComponent) {
    this.controller = controller;
  }

  public init(): void {
    const root: HTMLElement | null = document.querySelector('.product-cart');
    const containerRoot: HTMLElement | null = document.querySelector('.container__product-cart');

    if (root !== null && containerRoot !== null) {
      this.containerRoot = containerRoot;
      this.root = root;
      this.pagination.init();
    }
  }

  public make(): string {
    const elem = `
      <div class="product-cart">
        ${this.pagination.make()}
        <div class="container__product-cart"></div>
      </div>
    `;
    return elem.trim();
  }

  public add(product: ProductItem, index: number): void {
    if (typeof product.id === 'number') {
      const prod = new Product(String(product.id), product, index);
      prod.emitAdd = this.callbackAdd;
      prod.emitRemove = this.callback;
      const item = prod.make();
      this.containerRoot?.insertAdjacentHTML('beforeend', item);
      prod.init();
      this.products.push(prod);
    }

    this.pagination.setProducts(this.products);
    this.controller.updateTotal(this.calcTotalCount(), this.calcTotalSum());
  }

  public callback = () => {
    let saveIndex: number | undefined;
    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      if (product.IsDirty) {
        product.unmount();
        product.Root?.remove();
        saveIndex = i;
      }
    }

    if (saveIndex !== undefined) {
      this.products.splice(saveIndex, 1);
    }
    this.controller.updateTotal(this.calcTotalCount(), this.calcTotalSum());
  };

  public callbackAdd = () => {
    this.controller.updateTotal(this.calcTotalCount(), this.calcTotalSum());
  };

  private calcTotalCount(): number {
    let totalCount = 0;
    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      totalCount += product.Count;
    }
    return totalCount;
  }

  private calcTotalSum(): number {
    let totalSum = 0;
    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      totalSum += product.Price;
    }
    return totalSum;
  }
}

export default ProductCart;
