import './scss/main-page.styles.scss';
import storage from '../app/storage/storage';

class MainPageComponent {
  #elements: { [key: string]: HTMLElement | null } = {};

  constructor() {
    this.init = this.init.bind(this);
    this.unmount = this.unmount.bind(this);
    this.render = this.render.bind(this);
  }

  init(): void {
    this.#elements = {
      productsList: document.querySelector('.products-list'),
    };

    this.renderProducts();
  }

  unmount(): void {
    console.log('Unmount Main Page Component');
  }

  render(): string {
    return `
      <section class="main-page">
        <h2 class="title">This is Main Page Component.</h2>
        <p> Products list:</p>
        <ul class="products-list"></ul>
      </section>
    `;
  }

  renderProducts(products: unknown[] = storage.getProducts()): void {
    this.#elements.productsList?.insertAdjacentHTML(
      'afterbegin',
      products
        .map((product: unknown) => `<li class="product-item">${JSON.stringify(product).slice(0, 200)}...</li>`)
        .join('')
    );
  }
}

export default new MainPageComponent();
