import './scss/sorting-block.styles.scss';

import queryParamsService from '../../../../services/query-params.service';

import { getActiveClassNameBySortingState } from './common/sorting-block.helpers';

import { SEPARATOR, SORTING_BY, SORTING_ORDERS } from '../../../../common/common.constants';
import { DEFAULT_SORTING_BY } from './common/sorting-block.constants';
import { QUERY_PARAMS_NAMES } from '../../../../services/common/services.constants';

class SortingBlockComponent {
  #sortingBlockContainer: HTMLElement | null = null;
  #sortingButtons: NodeListOf<HTMLElement> | null = null;

  #updateMainPage: () => void = () => null;

  constructor() {
    this.unmount = this.unmount.bind(this);
    this.sortingButtonClickHandler = this.sortingButtonClickHandler.bind(this);
  }

  init(updateMainPage: () => void): void {
    this.#updateMainPage = updateMainPage;

    this.#sortingBlockContainer = document.querySelector('.sorting-block-container');
    this.#sortingButtons = this.#sortingBlockContainer?.querySelectorAll('.sorting-block-button') || null;

    this.#addListeners();
  }

  resetAllSortingsState(): void {
    this.#sortingButtons?.forEach((sortingButton) =>
      sortingButton.classList.remove('sorting-block-button_active', 'sorting-block-button_rotated')
    );
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
        queryParamsService.setQueryParam(QUERY_PARAMS_NAMES.SORTING, sortingOptionsString);

        clickedSortingButton.classList.toggle('sorting-block-button_rotated');
        return;
      }

      const sortingOptionsString = `${sortingBy}${SEPARATOR}${SORTING_ORDERS.ASC}`;
      queryParamsService.setQueryParam(QUERY_PARAMS_NAMES.SORTING, sortingOptionsString);

      clickedSortingButton.classList.add('sorting-block-button_active');
    });

    this.#updateMainPage();
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
