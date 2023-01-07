import './scss/dual-slider.styles.scss';

import { getSliderBackground } from './common/dual-slider.helper';

import { DEFAULT_DUAL_SLIDER_COLORS } from './common/dual-slider.common';

import { MinMaxRange } from '../../../../../../models/common.model';
import { DualSliderColors } from './models/dual-slider.model';

class DualSlider {
  #elements: { [key: string]: HTMLInputElement | HTMLElement | null } = {};

  #additionalClass: string;

  #limits: MinMaxRange;
  #values: MinMaxRange;

  #colors: DualSliderColors;

  #postfixValue: string;

  #updateQueryParams: () => void = () => null;

  constructor(
    additionalClass = '',
    limits: MinMaxRange,
    values: MinMaxRange,
    postfixValue = '',
    colors: DualSliderColors = DEFAULT_DUAL_SLIDER_COLORS
  ) {
    this.#additionalClass = additionalClass;

    this.#limits = limits;
    this.#values = values;

    this.#postfixValue = postfixValue;

    this.#colors = colors;

    this.toSliderOnInputHandler = this.toSliderOnInputHandler.bind(this);
    this.fromSliderOnInutHandler = this.fromSliderOnInutHandler.bind(this);
  }

  init(updateQueryParams: () => void): void {
    const container: HTMLElement | null = document.querySelector(`.range-container.${this.#additionalClass}`);
    if (!container) return;

    this.#elements = {
      fromSlider: container.querySelector('.from-slider'),
      toSlider: container.querySelector('.to-slider'),
      rangeInfo: container.querySelector('.range-info'),
    };

    this.#updateQueryParams = updateQueryParams;

    this.#elements.toSlider?.addEventListener('input', this.toSliderOnInputHandler);
    this.#elements.fromSlider?.addEventListener('input', this.fromSliderOnInutHandler);
    this.#colorSlider();
    this.#toggleAccessibleSlider();
  }

  unmount(): void {
    this.#elements.toSlider?.removeEventListener('input', this.toSliderOnInputHandler);
    this.#elements.fromSlider?.removeEventListener('input', this.fromSliderOnInutHandler);
  }

  getValues(): MinMaxRange {
    return this.#values;
  }

  toSliderOnInputHandler(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const newMaxValue = Number(element.value);

    if (newMaxValue < this.#values.min) {
      element.value = String(this.#values.min);
      this.#values.max = this.#values.min;
    } else this.#values.max = newMaxValue;

    this.#toggleAccessibleSlider();
    this.#updateSliderState();
  }

  fromSliderOnInutHandler(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const newMinValue = Number(element.value);

    if (newMinValue > this.#values.max) {
      element.value = String(this.#values.max);
      this.#values.min = this.#values.max;
    } else this.#values.min = newMinValue;

    this.#updateSliderState();
  }

  #updateSliderState(): void {
    this.#colorSlider();
    this.#updateRangeInfo();
    this.#updateQueryParams();
  }

  #colorSlider(): void {
    if (!this.#elements.toSlider) return;
    this.#elements.toSlider.style.background = getSliderBackground(this.#limits, this.#values, this.#colors);
  }

  #toggleAccessibleSlider(): void {
    if (!this.#elements.toSlider) return;

    const toSliderValue = Number((this.#elements.toSlider as HTMLInputElement).value);
    if (toSliderValue <= this.#limits.min) {
      this.#elements.toSlider.classList.add('to-slider-z-index-2');
    } else this.#elements.toSlider.classList.remove('to-slider-z-index-2');
  }

  updateRangeInputs(limits: MinMaxRange, values: MinMaxRange): void {
    if (!this.#elements.fromSlider || !this.#elements.toSlider) return;

    this.#limits = limits;
    this.#values = values;

    (this.#elements.fromSlider as HTMLInputElement).value = String(values.min);
    this.#elements.fromSlider.setAttribute('min', String(limits.min));
    this.#elements.fromSlider.setAttribute('max', String(limits.max));

    (this.#elements.toSlider as HTMLInputElement).value = String(values.max);
    this.#elements.toSlider.setAttribute('min', String(limits.min));
    this.#elements.toSlider.setAttribute('max', String(limits.max));

    this.#colorSlider();
    this.#updateRangeInfo();
    this.#toggleAccessibleSlider();
  }

  #renderRangeInfo(
    minValue = this.#values.min,
    maxValue = this.#values.max,
    postfixValue = this.#postfixValue
  ): string {
    return `
      <span class="min-range">min: ${minValue} ${postfixValue}</span>
      <span class="max-range">max: ${maxValue} ${postfixValue}</span>`;
  }

  #updateRangeInfo(minValue = this.#values.min, maxValue = this.#values.max, postfixValue = this.#postfixValue): void {
    if (!this.#elements.rangeInfo) return;
    this.#elements.rangeInfo.innerHTML = this.#renderRangeInfo(minValue, maxValue, postfixValue);
  }

  #renderRangeInputs(limits: MinMaxRange, values: MinMaxRange): string {
    return `
      <input class="from-slider" type="range" value="${values.min}" min="${limits.min}" max="${limits.max}"/>
      <input class="to-slider" type="range" value="${values.max}" min="${limits.min}" max="${limits.max}"/>`;
  }

  render(): string {
    return `
      <div class="range-container ${this.#additionalClass}">
        <div class="sliders-block">
          ${this.#renderRangeInputs(this.#limits, this.#values)}
        </div>
        <p class="range-info">
          ${this.#renderRangeInfo()}
        </p>
      </div>`;
  }
}

export default DualSlider;
