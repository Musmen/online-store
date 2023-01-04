import { SORTING_BY, SORTING_ORDERS } from '../../../../../common/common.constants';

type GetActiveClassNameBySortingStateType = (
  buttonSortingBy: SORTING_BY,
  sortingBy: SORTING_BY,
  sortingOrder: SORTING_ORDERS
) => string;

export const getActiveClassNameBySortingState: GetActiveClassNameBySortingStateType = (
  buttonSortingBy: SORTING_BY,
  sortingBy: SORTING_BY,
  sortingOrder: SORTING_ORDERS
) => {
  const additionalClass = sortingOrder === SORTING_ORDERS.DES ? 'sorting-block-button_rotated' : '';
  return buttonSortingBy === sortingBy ? `sorting-block-button_active ${additionalClass}` : '';
};
