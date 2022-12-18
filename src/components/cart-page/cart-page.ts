import './scss/cart.styles.scss';

class CartComponent {
  #elements: { [key: string]: HTMLElement | null } = {};

  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
  }

  init(): void {
    console.log('Init Cart Component');
  }

  unmount(): void {
    console.log('Unmount Cart Component');
  }

  render(): string {
    return `
      <section class="cart-page">
        <h2 class="title">This is Cart Component</h2>
      </section>
    `;
  }
}

export default new CartComponent();
