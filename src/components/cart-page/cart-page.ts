import ProductCart from './components/ProductCart';
import Total from './components/Total';
import './scss/cart.styles.scss';
// TEST
import data from '../app/storage/data/products';
import { ISubsccribe } from '../../eventbus/interface/IMetka'; // << Test Event Bus
import EventBus from '../../eventbus/EventBus'; // << Test Event Bus

export class CartComponent implements ISubsccribe {
  #elements: { [key: string]: HTMLElement | null } = {};
  private productCart: ProductCart = new ProductCart(this);
  private total: Total = new Total();

  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
  }

  init(): void {
    console.log('Init Cart Component');
    this.productCart.init();
    this.total.init();
    // Test
    this.productCart.add(data[0], 1);
    this.productCart.add(data[1], 2);
    this.productCart.add(data[2], 3);
    this.productCart.add(data[3], 4);
    this.productCart.add(data[4], 5);
    // this.productCart.add(data[5], 6);
    // this.productCart.add(data[6], 7);
    // this.productCart.add(data[7], 8);
    // this.productCart.add(data[8], 9);
    // this.productCart.add(data[9], 10);
    // this.productCart.add(data[10], 11);
    // this.productCart.add(data[11], 12);
    // this.productCart.add(data[12], 13);
    EventBus.subscribe(this, 'lol', this.subscribe); // << Test Event BusEventBus;
  }

  unmount(): void {
    console.log('Unmount Cart Component');
    this.total.unmount();
  }

  public updateTotal(count: number, price: number): void {
    this.total.setProductCount(count);
    this.total.setPrice(price);
    EventBus.emit('lol', price);
  }

  //<<ISubsccribe
  public subscribe(val: unknown): void {
    console.log('subscribe: Сработал');
    console.log(val);
  }
  //<<END

  public addProduct(): void {
    console.log(data);
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
}

export default new CartComponent();
