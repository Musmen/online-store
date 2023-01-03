import './scss/search-bar.styles.scss';
import queryParamsService from '../../../../services/query-params.service';
import { DEBOUNCE_TIME } from './common/search-bar.constants';

class SearchBarComponent {
  #inputElement: HTMLInputElement | null = null;
  #timerId: NodeJS.Timeout | null = null;

  #updateProducts: () => void = () => null;

  constructor() {
    this.unmount = this.unmount.bind(this);
    this.searchInputHandler = this.searchInputHandler.bind(this);
    this.debouncedOnInputHandler = this.debouncedOnInputHandler.bind(this);
  }

  init(updateProducts: () => void): void {
    this.#updateProducts = updateProducts;

    this.#inputElement = document.querySelector('.search-bar__input');

    this.#addListeners();
  }

  searchInputHandler(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchValue: string = inputElement.value;

    if (searchValue) {
      queryParamsService.setQueryParam('search', searchValue);
    } else queryParamsService.unsetQueryParam('search');

    this.#updateProducts();
  }

  debouncedOnInputHandler(event: Event): void {
    clearTimeout(this.#timerId || 0);
    this.#timerId = setTimeout(() => this.searchInputHandler(event), DEBOUNCE_TIME);
  }

  #addListeners(): void {
    this.#inputElement?.addEventListener('input', this.debouncedOnInputHandler);
  }

  #removeListeners(): void {
    this.#inputElement?.removeEventListener('input', this.debouncedOnInputHandler);
  }

  unmount(): void {
    clearTimeout(this.#timerId || 0);
    this.#removeListeners();
  }

  render(): string {
    const { search } = queryParamsService.getQueryParams();

    return `
      <input
        class="search-bar__input"
        type="search"
        name="search"
        placeholder="Search product by text"
        autocomplete="off"
        value="${search || ''}"
      >`;
  }
}

export default new SearchBarComponent();
