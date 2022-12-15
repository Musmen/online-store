import './scss/product-item.styles.scss';

class ProductItemComponent {
  #elements: { [key: string]: HTMLElement | null } = {};

  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
  }

  init(): void {
    console.log('Init Product Item Component');
  }

  unmount(): void {
    console.log('Unmount Product Item Component');
  }

  render(): string {
    return `
      <article class="product-item">
        <h2>This is Product Item Component</h2>
      </article>
    `;
  }
}

export default new ProductItemComponent();
