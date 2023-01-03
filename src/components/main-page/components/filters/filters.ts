import './scss/filters.styles.scss';

import productsService from '../../../../services/products.service';
import queryParamsService from '../../../../services/query-params.service';

import {
  FilterCategoryNames,
  FILTER_OPTIONS,
  FILTER_OPTIONS_TEMPLATES,
  SEPARATOR,
  SelectedOptions,
} from './common/filter.constants';

import { Category, ProductsCount } from '../../../../models/common.model';
import { ProductItem } from '../../../../models/product-item.model';

class FiltersComponent {
  #elements: {
    [key: string]: NodeListOf<HTMLElement> | null;
  };

  #updateProducts: () => void = () => null;

  constructor() {
    this.#elements = {
      countsInfo: null,
      selectHeaders: null,
      checkboxes: null,
    };

    this.unmount = this.unmount.bind(this);
    this.selectHeaderOnClickHandler = this.selectHeaderOnClickHandler.bind(this);
    this.checkboxOnChangeHandler = this.checkboxOnChangeHandler.bind(this);
  }

  init(updateProducts: () => void): void {
    this.#updateProducts = updateProducts;

    this.#elements = {
      countsInfo: document.querySelectorAll('.count-info'),
      selectHeaders: document.querySelectorAll('.tanks-select__header'),
      checkboxes: document.querySelectorAll('.filter-checkbox'),
    };

    this.#addListeners();
  }

  selectHeaderOnClickHandler(event: Event): void {
    const selectHeaderElement = event.currentTarget as HTMLElement;
    selectHeaderElement.parentElement?.classList.toggle('open');
  }

  checkboxOnChangeHandler(event: Event): void {
    const checkboxElement = event.currentTarget as HTMLInputElement;

    const [name, value] = checkboxElement.name.split(SEPARATOR);

    if (checkboxElement.checked) {
      queryParamsService.addQueryParam(name, value);
    } else {
      queryParamsService.deleteQueryParam(name, value);
    }

    this.#updateProducts();
  }

  #addListeners(): void {
    this.#elements.selectHeaders?.forEach((selectHeader: Element) => {
      const selectHeaderElement = selectHeader as HTMLElement;
      selectHeaderElement.addEventListener('click', this.selectHeaderOnClickHandler);
    });

    this.#elements.checkboxes?.forEach((checkbox: Element) => {
      const checkboxElement = checkbox as HTMLInputElement;
      checkboxElement.addEventListener('change', this.checkboxOnChangeHandler);
    });
  }

  #removeListeners(): void {
    this.#elements.selectHeaders?.forEach((selectHeader: Element) => {
      const selectHeaderElement = selectHeader as HTMLElement;
      selectHeaderElement.removeEventListener('click', this.selectHeaderOnClickHandler);
    });

    this.#elements.checkboxes?.forEach((checkbox: Element) => {
      const checkboxElement = checkbox as HTMLInputElement;
      checkboxElement.removeEventListener('change', this.checkboxOnChangeHandler);
    });
  }

  unmount(): void {
    this.#removeListeners();
  }

  #renderCount(category: Category): string {
    const categoryProductsCount: ProductsCount = productsService.getCategoryItemsCount(category);
    const { total, current } = categoryProductsCount;
    return `(<span class="current-count">${current}</span>/<span class="total-count">${total}</span>)`;
  }

  updateCounts(): void {
    this.#elements.countsInfo?.forEach((countsInfoElement: HTMLElement) => {
      const option = countsInfoElement.dataset.option;
      if (!option) return;

      const [name, value] = option.split(' ') as [keyof ProductItem, string];
      countsInfoElement.innerHTML = this.#renderCount({ name, value });
    });
  }

  #renderFilterOption(name: FilterCategoryNames, value: string, selectedOptions: SelectedOptions): string {
    const isCheckboxChecked: boolean = selectedOptions[name].includes(value);
    const checkboxName = `${name}${SEPARATOR}${value}`;

    return `
      <li class="tanks-select__item">
        <label class="tanks-select__label">
          <input
            class="checkbox filter-checkbox" 
            type="checkbox"
            name="${checkboxName}"
            ${isCheckboxChecked ? 'checked' : ''}
          >
          ${FILTER_OPTIONS_TEMPLATES[name][value]}
          <span class="count-info" data-option="${name}${SEPARATOR}${value}">
            ${this.#renderCount({ name, value })}
          </span>
        </label>
      </li>`;
  }

  render(): string {
    const { nation, type } = queryParamsService.getQueryParams();
    const selectedOptions: SelectedOptions = {
      nation: nation?.split(' ') || [],
      type: type?.split(' ') || [],
    };

    return FILTER_OPTIONS.map(
      (filterOption) => `
    <aside class="tanks-select select-${filterOption.name}">
      <header class="tanks-select__header">
        <p class="tanks-select__current">
          <span class="tanks-select__value">
            ${filterOption.name}
          </span
        </p>
        <svg class="tanks-select__icon">
          <use xlink:href="assets/images/sprite.svg#arrow"></use>
        </svg>
      </header>
      <ul class="tanks-select__body">
        ${filterOption.values
          .map((filterOptionValue: string) =>
            this.#renderFilterOption(filterOption.name, filterOptionValue, selectedOptions)
          )
          .join('')}
      </ul>
    </aside>`
    ).join('');
  }
}

export default new FiltersComponent();
