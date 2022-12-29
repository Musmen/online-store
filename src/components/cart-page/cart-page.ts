import ProductCart from './widgets/product-cart/ProductCart';
import Total from './widgets/total/Total';
import './scss/cart.styles.scss';
// TEST
import data from '../app/storage/data/products';
import { IMetka } from '../../eventbus/interface/IMetka'; // << Test Event Bus
import EventBus from '../../eventbus/EventBus'; // << Test Event Bus
import { ProductItem } from '../../models/product-item.model';

export class CartComponent {
  #elements: { [key: string]: HTMLElement | null } = {};
  private root: HTMLElement | undefined;
  private productCart: ProductCart = new ProductCart(this);
  private total: Total = new Total();

  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
  }

  init(): void {
    console.log('Init Cart Component');
    const root: HTMLElement | null = document.querySelector('.cart-page');
    if (root === null) return;
    this.root = root;
    this.productCart.init();
    this.total.init();
    // Test
    // EventBus.subscribe(this, 'product', this.onProduct);
    this.productCart.add(data[0], 1);
    this.productCart.add(data[1], 2);
    this.productCart.add(data[2], 3);
    this.productCart.add(data[3], 4);
    this.productCart.add(data[4], 5);
    this.productCart.add(data[5], 6);
    this.productCart.add(data[6], 7);
    this.productCart.add(data[7], 8);
    this.productCart.add(data[8], 9);
    this.productCart.add(data[9], 10);
    this.productCart.add(data[10], 11);
    this.productCart.add(data[11], 12);
    this.productCart.add(data[12], 13);
    // EventBus.subscribe(this, 'lol', this.subscribe); // << Test Event BusEventBus;
    console.log(this.BD);
    // this.useBD();
  }

  unmount(): void {
    console.log('Unmount Cart Component');
    this.total.unmount();
  }

  public updateTotal(count: number, price: number): void {
    this.total.setProductCount(count);
    this.total.setPrice(price);
    EventBus.emit('price', price);
    EventBus.emit('counts', count);
  }

  //<<ISubsccribe
  // public subscribe(val: unknown): void {
  //   console.log('subscribe: Сработал');
  //   console.log(val);
  // }
  //<<END

  private BD: ProductItem[] = [];
  private onProduct = (product: unknown) => {
    const prod = product as ProductItem;
    this.BD.push(prod);
  };

  private useBD(): void {
    for (let i = 0; i < this.BD.length; i++) {
      const product = this.BD[i];
      this.productCart.add(product, i);
    }
  }

  public emptyCart(): void {
    this.productCart.Root?.remove();
    this.total.unmount();
    this.total.Root?.remove();

    if (this.root !== undefined) {
      this.root.insertAdjacentHTML('beforeend', this.makeEmptyCart());
    }
  }

  // <h2 class="title">This is Cart Component</h2>
  render(): string {
    return `
      <section class="cart-page">
        ${this.productCart.make()}
        ${this.total.make()}
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
