import './scss/card-size-toggler.styles.scss';

import queryParamsService from '../../../../services/query-params.service';

import { QUERY_PARAMS_NAMES } from '../../../../services/common/services.constants';
import { SIZE_QUERY_PARAM_VALUES } from './common/card-size-toggler.constants';

class CardSizeTogglerComponent {
  #togglerElement: HTMLInputElement | null = null;
  #productsListContainer: HTMLElement | null = null;

  constructor() {
    this.unmount = this.unmount.bind(this);
    this.togglerOnClickHandler = this.togglerOnClickHandler.bind(this);
  }

  init(productsListContainer: HTMLElement | null): void {
    this.#productsListContainer = productsListContainer;
    this.#togglerElement = document.querySelector('.card-size-toggler');

    const { size } = queryParamsService.getQueryParams();
    if (size === SIZE_QUERY_PARAM_VALUES.BIG) {
      this.#toggleCardsSize();
      this.#togglerElement && (this.#togglerElement.checked = true);
    }

    this.#addListeners();
  }

  resetTogglerState(): void {
    this.#togglerElement && (this.#togglerElement.checked = false);
    this.#productsListContainer?.classList.remove('products-list_big-card');
  }

  togglerOnClickHandler(): void {
    this.#toggleCardsSize();

    if (this.#productsListContainer?.classList.contains('products-list_big-card')) {
      queryParamsService.setQueryParam(QUERY_PARAMS_NAMES.SIZE, SIZE_QUERY_PARAM_VALUES.BIG);
    } else queryParamsService.setQueryParam(QUERY_PARAMS_NAMES.SIZE, SIZE_QUERY_PARAM_VALUES.SMALL);
  }

  #toggleCardsSize(): void {
    this.#productsListContainer?.classList.toggle('products-list_big-card');
  }

  #addListeners(): void {
    this.#togglerElement?.addEventListener('click', this.togglerOnClickHandler);
  }

  #removeListeners(): void {
    this.#togglerElement?.removeEventListener('click', this.togglerOnClickHandler);
  }

  unmount(): void {
    this.#removeListeners();
  }

  render(): string {
    return `
      <input class="card-size-toggler toggler-flip" id="card-size-toggler" type="checkbox"/>
      <label class="card-size-toggler-label label-flip" for="card-size-toggler"></label>
    `;
  }
}

export default new CardSizeTogglerComponent();
