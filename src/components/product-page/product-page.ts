import './scss/product-page.styles.scss';

class ProductPageComponent {
  #elements: { [key: string]: HTMLElement | null } = {};

  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
  }

  init(): void {
    console.log('Init Product Page Component');
  }

  unmount(): void {
    console.log('Unmount Product Page Component');
  }

  render(): string {
    return `
      <section class="product-page">
        <h2 class="title">This is Product Page Component</h2>
      </section>
    `;
  }
}

export default new ProductPageComponent();
