import './scss/main-page.styles.scss';

import filters from './components/filters/filters';
import ProductItemComponent from '../product-item/product-item';

import productsService from '../../services/products.service';

import { ProductItem } from '../../models/product-item.model';
import searchBar from './components/search-bar/search-bar';

class MainPageComponent {
  #elements: { [key: string]: HTMLElement | null } = {};

  constructor() {
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
    this.updateProducts = this.updateProducts.bind(this);
  }

  init(): void {
    this.#elements = {
      productsList: document.querySelector('.products-list'),
    };

    filters.init(this.updateProducts);
    searchBar.init(this.updateProducts);
  }

  unmount(): void {
    filters.unmount();
    searchBar.unmount();
  }

  #renderProducts(products: ProductItem[]): string {
    return products
      .map(
        (product) => `
          <li class="product-item">${new ProductItemComponent(product).render()}</li>`
      )
      .join('');
  }

  updateProducts(): void {
    if (!this.#elements.productsList) return;

    const products: ProductItem[] = productsService.getFilteredProducts();

    this.#elements.productsList.innerHTML = '';
    this.#elements.productsList.insertAdjacentHTML('afterbegin', this.#renderProducts(products));

    filters.updateCounts();
  }

  render(): string {
    const products: ProductItem[] = productsService.getFilteredProducts();

    return `
      <section class="search-bar-container">
        <h3 class="visually-hidden">Search Bar</h3>
        ${searchBar.render()}
      </section>
      <section class="filters-container">
        <h3 class="visually-hidden">Filters</h3>
        ${filters.render()}
      </section>
      <section class="main-page">
        <h2 class="visually-hidden">Main Page. Shop Products List</h2>
        <ul class="list products-list">
          ${this.#renderProducts(products)}
        </ul>
      </section>
    `;
  }
}

export default new MainPageComponent();
