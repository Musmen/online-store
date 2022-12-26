import './scss/main-page.styles.scss';

import storage from '../app/storage/storage';
import ProductItemComponent from '../product-item/product-item';
import { ProductItem } from '../../models/product-item.model';

class MainPageComponent {
  #elements: { [key: string]: HTMLElement | null } = {};

  constructor() {
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
  }

  init(): void {
    this.#elements = {
      productsList: document.querySelector('.products-list'),
    };

    const products: ProductItem[] = storage.getProducts();
    this.renderProducts(products);
  }

  render(): string {
    return `
      <section class="main-page">
        <h2 class="visually-hidden">Main Page. Shop Products List</h2>
        <ul class="list products-list"></ul>
      </section>
    `;
  }

  renderProducts(products: ProductItem[]): void {
    this.#elements.productsList?.insertAdjacentHTML(
      'afterbegin',
      products
        .map(
          (product) => `
            <li class="product-item">${new ProductItemComponent(product).render()}</li>`
        )
        .join('')
    );
  }
}

export default new MainPageComponent();
