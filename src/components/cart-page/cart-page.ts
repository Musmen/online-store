import './scss/cart.styles.scss';
import EventBus from '../../eventbus/EventBus'; // << Test Event Bus
import TotalController from './widgets/total/controller/TotalController';
import CartStoreService from './models/CartStoreService';

import ProductCartController from './widgets/product-cart/controller/ProductCartController';
import EventCartEmpty from '../../eventbus/events/EventCartEmpty';

export class CartComponent {
  #elements: { [key: string]: HTMLElement | null } = {};
  private root: HTMLElement | undefined;
  private productCartController: ProductCartController = new ProductCartController();
  private totalController: TotalController = new TotalController();

  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
  }

  private initProductList(): void {
    for (let i = 0; i < CartStoreService.Products.length; i++) {
      const product = CartStoreService.Products[i];
      this.productCartController.addProduct(product);
    }
  }

  init(): void {
    const root: HTMLElement | null = document.querySelector('.cart-page');
    if (root === null) return;
    this.root = root;

    CartStoreService.init();

    if (CartStoreService.Products.length <= 0) {
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
}

export default new CartComponent();
