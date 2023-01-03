import './scss/cart.styles.scss';
import EventBus from '../../eventbus/EventBus'; // << Test Event Bus
import { ProductItem } from '../../models/product-item.model';
import TotalController from './widgets/total/controller/TotalController';
import ProductStoreModel from './models/ProductStoreModel';

import ProductCartController from './widgets/product-cart/controller/ProductCartController';
import CartStorageService from './service/CartStorageService';
import EventCartEmpty from '../../eventbus/events/EventCartEmpty';

export class CartComponent {
  #elements: { [key: string]: HTMLElement | null } = {};
  private root: HTMLElement | undefined;
  private productCartController: ProductCartController = new ProductCartController();
  private totalController: TotalController = new TotalController();

  private productList = ProductStoreModel;
  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
    EventBus.subscribe(this, 'product', this.onProduct);
  }

  private onProduct = (product: ProductItem, link: string | undefined) => {
    if (product === null) return;
    if (link !== undefined) {
      this.productList.add(product, link);
    }
  };

  private initProductList(): void {
    for (let i = 0; i < this.productList.Products.length; i++) {
      const product = this.productList.Products[i];
      this.productCartController.addProduct(product, this.productList.Links[i]);
    }
  }

  // TEST
  private isEmptyStorage(): void {
    const test = CartStorageService.getFrom('products');
    if (test.length <= 0) return;
    this.productList.reset();
    for (let i = 0; i < test.length; i++) {
      this.productList.add(test[i]);
    }
    CartStorageService.deleteFrom('products');
  }

  init(): void {
    const root: HTMLElement | null = document.querySelector('.cart-page');
    if (root === null) return;
    this.root = root;

    if (this.productList.Products.length <= 0) {
      this.emptyCart();
    }

    this.totalController.init();

    this.productCartController.init();
    this.initProductList();
    EventBus.subscribe(this, 'price-and-counts', this.onUpdateTotal);
    EventCartEmpty.current.subscribe(this.onCartEmpty);
  }

  unmount(): void {
    this.productCartController.unmount();
    this.totalController.unmount();
  }

  private onUpdateTotal = (price: number, count: number | undefined) => {
    if (count === undefined) return;
    this.totalController.setPriceAndCount(count, price);
  };

  public emptyCart(): void {
    this.root?.classList.add('cart-empty');
    if (this.root !== undefined) {
      document.querySelector('.product-cart')?.remove();
      document.querySelector('.wraper-total-cart')?.remove();
    }
  }

  private onCartEmpty = () => {
    this.emptyCart();
  };

  render(): string {
    return `
      <section class="cart-page">
        ${this.productCartController.render()}
        ${this.totalController.render()}
      </section>
    `;
  }

  public makeEmptyCart(): string {
    const elem = `
      <div class="cart-empty"></div>
    `;
    return elem.trim();
  }
}

export default new CartComponent();
