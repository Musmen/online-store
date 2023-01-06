import './scss/main-page.styles.scss';

import productsService from '../../services/products.service';

import filters from './components/filters/filters';
import searchBar from './components/search-bar/search-bar';
import sortingBlock from './components/sorting-block/sorting-block';
import cardSizeToggler from './components/card-size-toggler/card-size-toggler';
import dualSlidersController from './components/dual-sliders-block/dual-sliders-block';

import ProductItemComponent from '../product-item/product-item';

import { EMPTY_MESSAGE } from './common/main-page.constants';

import { ProductItem } from '../../models/product-item.model';

class MainPageComponent {
  #elements: { [key: string]: HTMLElement | null } = {};

  constructor() {
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
    this.updateMainPage = this.updateMainPage.bind(this);
  }

  init(): void {
    this.#elements = {
      productsList: document.querySelector('.products-list'),
      totalAmountInfo: document.querySelector('.total-amount__value'),
    };

    this.#updateTotalAmountInfo();

    filters.init(this.updateMainPage);
    searchBar.init(this.updateMainPage);
    sortingBlock.init(this.updateMainPage);
    cardSizeToggler.init(this.#elements.productsList);

    const dualSlidersContainer: HTMLElement | null = document.querySelector('.dual-sliders-container');
    dualSlidersController.init(this.updateMainPage, dualSlidersContainer);
  }

  unmount(): void {
    filters.unmount();
    searchBar.unmount();
    sortingBlock.unmount();
    cardSizeToggler.unmount();
    dualSlidersController.unmount();
  }

  #renderProducts(products: ProductItem[]): string {
    return (
      products
        .map(
          (product) => `
          <li class="product-item">${new ProductItemComponent(product).render()}</li>`
        )
        .join('') || `<li class="empty-message">${EMPTY_MESSAGE}</li>`
    );
  }

  #updateProducts(): void {
    if (!this.#elements.productsList) return;

    productsService.updateSelectedProducts();
    const products: ProductItem[] = productsService.getSelectedProducts();
    this.#elements.productsList.innerHTML = this.#renderProducts(products);
  }

  #updateTotalAmountInfo(): void {
    if (!this.#elements.totalAmountInfo) return;
    this.#elements.totalAmountInfo.innerText = String(productsService.getSelectedProductsAmount());
  }

  updateMainPage(
    { shouldUpdatePriceDualSlider, shouldUpdateAmountDualSlider } = {
      shouldUpdatePriceDualSlider: true,
      shouldUpdateAmountDualSlider: true,
    }
  ) {
    this.#updateProducts();
    this.#updateTotalAmountInfo();
    filters.updateCounts();
    dualSlidersController.updateDualSliders({ shouldUpdatePriceDualSlider, shouldUpdateAmountDualSlider });
  }

  render(): string {
    productsService.updateSelectedProducts();
    const products: ProductItem[] = productsService.getSelectedProducts();

    return `
      <section class="search-bar-container">
        <h3 class="visually-hidden">Search Bar</h3>
        ${searchBar.render()}
      </section>
      <section class="filters-container">
        <h3 class="visually-hidden">Filters</h3>
        ${filters.render()}
      </section>
      <section class="sorting-block-container">
        <h3>Sort by: </h3>
        ${sortingBlock.render()}
      </section>
      <div class="dual-sliders-container">
      </div>
      <div class="card-size-toggler-container">
        ${cardSizeToggler.render()}
      </div>
      <div class="main-page-controllers">
        <p class="total-amount">
          <span class="total-amount__title">Found: </span>
          <span class="total-amount__value"></span>
        </p>
      </div>
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
