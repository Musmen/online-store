import './scss/main-page.styles.scss';

import productsService from '../../services/products.service';
import queryParamsService from '../../services/query-params.service';

import filters from './components/filters/filters';
import searchBar from './components/search-bar/search-bar';
import sortingBlock from './components/sorting-block/sorting-block';
import cardSizeToggler from './components/card-size-toggler/card-size-toggler';
import dualSlidersController from './components/dual-sliders-block/dual-sliders-block';

import ProductItemComponent from '../product-item/product-item';

import { COPY_URL_BUTTON_TEXT, EMPTY_MESSAGE, SWITCHING_BUTTON_STATE_TIME } from './common/main-page.constants';

import { ProductItem } from '../../models/product-item.model';

// import storage from '../app/storage/storage'; // Doonn
import CartService from '../cart-page/service/CartService'; // Doonn

class MainPageComponent {
  #elements: { [key: string]: HTMLElement | null } = {};
  #timerId: NodeJS.Timeout | null = null;

  private cartService: CartService; // Doonn
  constructor() {
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
    this.updateMainPage = this.updateMainPage.bind(this);
    this.clearFiltersButtonOnClickHandler = this.clearFiltersButtonOnClickHandler.bind(this);
    this.copyUrlToClipboardButtonOnClickHandler = this.copyUrlToClipboardButtonOnClickHandler.bind(this);
    this.cartService = new CartService(); // Doonn
  }

  init(): void {
    this.#elements = {
      productsList: document.querySelector('.products-list'),
      totalAmountInfo: document.querySelector('.total-amount__value'),
      clearFiltersButton: document.querySelector('.clear-filters-button'),
      copyURLButton: document.querySelector('.copy-url-button'),
    };

    this.#updateTotalAmountInfo();

    filters.init(this.updateMainPage);
    searchBar.init(this.updateMainPage);
    sortingBlock.init(this.updateMainPage);
    cardSizeToggler.init(this.#elements.productsList);

    const dualSlidersContainer: HTMLElement | null = document.querySelector('.dual-sliders-container');
    dualSlidersController.init(this.updateMainPage, dualSlidersContainer);

    this.#addListeners();

    this.cartService.check(); // Doonn
    this.cartService.hundlerButton(); // Doonn
  }

  #addListeners(): void {
    this.#elements.clearFiltersButton?.addEventListener('click', this.clearFiltersButtonOnClickHandler);
    this.#elements.copyURLButton?.addEventListener('click', this.copyUrlToClipboardButtonOnClickHandler);
  }

  #removeListeners(): void {
    this.#elements.clearFiltersButton?.removeEventListener('click', this.clearFiltersButtonOnClickHandler);
    this.#elements.copyURLButton?.removeEventListener('click', this.copyUrlToClipboardButtonOnClickHandler);
  }

  unmount(): void {
    clearTimeout(this.#timerId || 0);
    this.#removeListeners();

    filters.unmount();
    searchBar.unmount();
    sortingBlock.unmount();
    cardSizeToggler.unmount();
    dualSlidersController.unmount();

    this.cartService.unmountButtons(); // Doonn
  }

  clearFiltersButtonOnClickHandler(event: Event): void {
    queryParamsService.clearAllQueryParams();
    filters.resetAllFiltersState();
    sortingBlock.resetAllSortingsState();
    cardSizeToggler.resetTogglerState();
    searchBar.resetSearchState();
    this.updateMainPage();

    const clearFiltersButton = event.target as HTMLButtonElement;
    if (!clearFiltersButton) return;

    clearFiltersButton.classList.add('clear-filters-button-active');
    this.#timerId = setTimeout(() => {
      clearFiltersButton.classList.remove('clear-filters-button-active');
    }, SWITCHING_BUTTON_STATE_TIME);
  }

  copyUrlToClipboardButtonOnClickHandler(event: Event): void {
    const copyURLToClipboardButton = event.target as HTMLButtonElement;
    if (!copyURLToClipboardButton) return;

    navigator.clipboard.writeText(window.location.href);

    copyURLToClipboardButton.classList.add('copy-url-button-active');
    copyURLToClipboardButton.innerText = COPY_URL_BUTTON_TEXT.ACTIVE;
    this.#timerId = setTimeout(() => {
      copyURLToClipboardButton.classList.remove('copy-url-button-active');
      copyURLToClipboardButton.innerText = COPY_URL_BUTTON_TEXT.DEFAULT;
    }, SWITCHING_BUTTON_STATE_TIME);
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

    this.cartService.check(); // Doonn
    this.cartService.hundlerButton(); // Doonn
  }

  render(): string {
    productsService.updateSelectedProducts();
    const products: ProductItem[] = productsService.getSelectedProducts();

    return `
      <section class="main-page-controls-bar">
        <div class="main-page-controls-bar-centralizer">
          <h2 class="visually-hidden">Main Page. Controls bar</h2>
          <div class="left-wrapper">
            <div class="main-page-controls">
              <p class="total-amount">
                <span class="total-amount__title">Found: </span>
                <span class="total-amount__value"></span>
              </p>
              <div class="main-page-controls-wrapper">
                <button class="clear-filters-button">Clear Filters</button>
                <button class="copy-url-button">Copy URL</button>
                <div class="card-size-toggler-container">
                  ${cardSizeToggler.render()}
                </div>
              </div>
            </div>
            <section class="search-bar-container">
              <h3 class="visually-hidden">Search Bar</h3>
              ${searchBar.render()}
            </section>
            <section class="sorting-block-container">
              <h3 class="sorting-block-title">Sort by: </h3>
              ${sortingBlock.render()}
            </section>
          </div>
          <div class="right-wrapper">
            <div class="dual-sliders-container">
            </div>
            <section class="filters-container">
              <h3 class="visually-hidden">Filters</h3>
              ${filters.render()}
            </section>
          </div>
        </div>
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
