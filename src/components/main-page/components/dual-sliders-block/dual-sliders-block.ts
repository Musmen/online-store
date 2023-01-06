import './scss/dual-sliders-block.styles.scss';

import productsService from '../../../../services/products.service';
import queryParamsService from '../../../../services/query-params.service';

import DualSlider from './components/dual-slider/dual-slider';

import {
  getLimitsAmountsInAllProducts,
  getLimitsAmountsInSelectedProducts,
  getLimitsPricesInAllProducts,
  getLimitsPricesInSelectedProducts,
} from './common/dual-sliders-block.helper';

import { PRICE_POSTFIX } from '../../../../common/common.constants';
import { QUERY_PARAMS_NAMES } from '../../../../services/common/services.constants';

import { MinMaxRange } from '../../../../models/common.model';
import { ProductItem } from '../../../../models/product-item.model';
import { UpdateMainPageType } from './models/dual-sliders-block.models';

class DualSlidersBlockComponent {
  priceDualSlider: DualSlider | null = null;
  amountDualSlider: DualSlider | null = null;

  #updateMainPage: UpdateMainPageType = () => null;

  constructor() {
    this.unmount = this.unmount.bind(this);
    this.priceDualSliderOnInputUpdateQueryParams = this.priceDualSliderOnInputUpdateQueryParams.bind(this);
    this.amountDualSliderOnInputUpdateQueryParams = this.amountDualSliderOnInputUpdateQueryParams.bind(this);
  }

  init(updateMainPage: UpdateMainPageType, dualSlidersContainer: HTMLElement | null): void {
    if (!dualSlidersContainer) return;

    this.#updateMainPage = updateMainPage;

    const pricesLimits: MinMaxRange = { ...getLimitsPricesInAllProducts() };
    const amountsLimits: MinMaxRange = { ...getLimitsAmountsInAllProducts() };
    const pricesValues: MinMaxRange = { ...getLimitsPricesInSelectedProducts() };
    const amountsValues: MinMaxRange = { ...getLimitsAmountsInSelectedProducts() };

    this.priceDualSlider = new DualSlider('price-dual-slider-container', pricesLimits, pricesValues, PRICE_POSTFIX);
    this.amountDualSlider = new DualSlider('amount-dual-slider-container', amountsLimits, amountsValues);

    dualSlidersContainer.innerHTML = this.render();

    this.priceDualSlider?.init(this.priceDualSliderOnInputUpdateQueryParams);
    this.amountDualSlider?.init(this.amountDualSliderOnInputUpdateQueryParams);
  }

  unmount(): void {
    if (!this.priceDualSlider || !this.amountDualSlider) return;

    this.priceDualSlider.unmount();
    this.amountDualSlider.unmount();
  }

  priceDualSliderOnInputUpdateQueryParams() {
    if (!this.priceDualSlider) return;

    const { min, max } = this.priceDualSlider.getValues();
    queryParamsService.setQueryParam(QUERY_PARAMS_NAMES.PRICE, `${min} ${max}`);

    this.#updateMainPage({ shouldUpdatePriceDualSlider: false, shouldUpdateAmountDualSlider: true });
  }

  amountDualSliderOnInputUpdateQueryParams() {
    if (!this.amountDualSlider) return;

    const { min, max } = this.amountDualSlider.getValues();
    queryParamsService.setQueryParam(QUERY_PARAMS_NAMES.AMOUNT, `${min} ${max}`);
    this.#updateMainPage({ shouldUpdatePriceDualSlider: true, shouldUpdateAmountDualSlider: false });
  }

  updateDualSliders({ shouldUpdatePriceDualSlider = true, shouldUpdateAmountDualSlider = true }) {
    const newSelectedProducts: ProductItem[] = productsService.getSelectedProducts();
    if (!newSelectedProducts.length) return;

    const pricesLimits: MinMaxRange = { ...getLimitsPricesInAllProducts() };
    const amountsLimits: MinMaxRange = { ...getLimitsAmountsInAllProducts() };
    const pricesValues: MinMaxRange = { ...getLimitsPricesInSelectedProducts() };
    const amountsValues: MinMaxRange = { ...getLimitsAmountsInSelectedProducts() };

    if (shouldUpdatePriceDualSlider) this.priceDualSlider?.updateRangeInputs(pricesLimits, pricesValues);
    if (shouldUpdateAmountDualSlider) this.amountDualSlider?.updateRangeInputs(amountsLimits, amountsValues);
  }

  render(): string {
    if (!this.priceDualSlider || !this.amountDualSlider) return '';

    return `
      <section class="price-dual-slider">
        <h3 class="visually-hidden">Price Filtering Dual Slider</h3>
        <p class="dual-slider-title">Price range: </p>
        ${this.priceDualSlider.render()}
      </section>
      <section class="amount-dual-slider">
        <h3 class="visually-hidden">Amount Filtering Dual Slider</h3>
        <p class="dual-slider-title">Amount range: </p>
        ${this.amountDualSlider.render()}
      </section>`;
  }
}

export default new DualSlidersBlockComponent();
