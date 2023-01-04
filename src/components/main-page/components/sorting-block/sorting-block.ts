import './scss/sorting-block.styles.scss';

import queryParamsService from '../../../../services/query-params.service';

import { getActiveClassNameBySortingState } from './common/sorting-block.helpers';

import { SEPARATOR, SORTING_BY, SORTING_ORDERS } from '../../../../common/common.constants';
import { DEFAULT_SORTING_BY, SORTING_QUERY_PARAM_NAME } from './common/sorting-block.constants';

class SortingBlockComponent {
  #sortingBlockContainer: HTMLElement | null = null;
  #sortingButtons: NodeListOf<HTMLElement> | null = null;

  #updateProducts: () => void = () => null;

  constructor() {
    this.unmount = this.unmount.bind(this);
    this.sortingButtonClickHandler = this.sortingButtonClickHandler.bind(this);
  }

  init(updateProducts: () => void): void {
    this.#updateProducts = updateProducts;

    this.#sortingBlockContainer = document.querySelector('.sorting-block-container');
    this.#sortingButtons = this.#sortingBlockContainer?.querySelectorAll('.sorting-block-button') || null;

    this.#addListeners();
  }

  sortingButtonClickHandler(event: Event): void {
    const clickedSortingButton = event.target as HTMLElement;
    if (!clickedSortingButton.classList.contains('sorting-block-button')) return;

    this.#sortingButtons?.forEach((sortingButton) => {
      if (sortingButton !== clickedSortingButton) {
        sortingButton.classList.remove('sorting-block-button_active', 'sorting-block-button_rotated');
        return;
      }

      const { sortingBy } = clickedSortingButton.dataset || DEFAULT_SORTING_BY;

      if (clickedSortingButton.classList.contains('sorting-block-button_active')) {
        const sortingOrderString = clickedSortingButton.classList.contains('sorting-block-button_rotated')
          ? SORTING_ORDERS.ASC
          : SORTING_ORDERS.DES;
        const sortingOptionsString = `${sortingBy} ${sortingOrderString}`;
        queryParamsService.setQueryParam(SORTING_QUERY_PARAM_NAME, sortingOptionsString);

        clickedSortingButton.classList.toggle('sorting-block-button_rotated');
        return;
      }

      const sortingOptionsString = `${sortingBy}${SEPARATOR}${SORTING_ORDERS.ASC}`;
      queryParamsService.setQueryParam(SORTING_QUERY_PARAM_NAME, sortingOptionsString);

      clickedSortingButton.classList.add('sorting-block-button_active');
    });

    this.#updateProducts();
  }

  #addListeners(): void {
    this.#sortingBlockContainer?.addEventListener('click', this.sortingButtonClickHandler);
  }

  #removeListeners(): void {
    this.#sortingBlockContainer?.removeEventListener('click', this.sortingButtonClickHandler);
  }

  unmount(): void {
    this.#removeListeners();
  }

  render(): string {
    const { sorting } = queryParamsService.getQueryParams();
    const [sortingBy, sortingOrder] = (sorting || '').split(SEPARATOR) as [SORTING_BY, SORTING_ORDERS];

    return Object.values(SORTING_BY)
      .map(
        (SORTING_BY_OPTION: SORTING_BY) => `
      <button 
        class="sorting-block-button ${getActiveClassNameBySortingState(SORTING_BY_OPTION, sortingBy, sortingOrder)}" 
        data-sorting-by="${SORTING_BY_OPTION}"
      >
        ${SORTING_BY_OPTION}
      </button>
      `
      )
      .join('');
  }
}

export default new SortingBlockComponent();
