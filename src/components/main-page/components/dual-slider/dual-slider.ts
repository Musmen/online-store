import './scss/dual-slider.styles.scss';

import { getSliderBackground } from './common/dual-slider.helper';
import { DEFAULT_DUAL_SLIDER_COLORS } from './common/dual-slider.common';
import { DualSliderColors, MinMaxRange } from './models/dual-slider.model';

class DualSlider {
  #elements: { [key: string]: HTMLElement | null } = {};

  #limits: MinMaxRange;
  #values: MinMaxRange;

  #colors: DualSliderColors;

  constructor(limits: MinMaxRange, values: MinMaxRange, colors: DualSliderColors = DEFAULT_DUAL_SLIDER_COLORS) {
    this.#limits = limits;
    this.#values = values;

    this.#colors = colors;

    this.toSliderOnInputHandler = this.toSliderOnInputHandler.bind(this);
    this.fromSliderOnInutHandler = this.fromSliderOnInutHandler.bind(this);
  }

  init(): void {
    this.#elements = {
      fromSlider: document.querySelector('.from-slider'),
      toSlider: document.querySelector('.to-slider'),
      rangeInfo: document.querySelector('.range-info'),
    };

    this.#elements.toSlider?.addEventListener('input', this.toSliderOnInputHandler);
    this.#elements.fromSlider?.addEventListener('input', this.fromSliderOnInutHandler);
    this.#colorSlider();
  }

  unmount(): void {
    this.#elements.toSlider?.removeEventListener('input', this.toSliderOnInputHandler);
    this.#elements.fromSlider?.removeEventListener('input', this.fromSliderOnInutHandler);
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

  #colorSlider(): void {
    if (!this.#elements.toSlider) return;
    this.#elements.toSlider.style.background = getSliderBackground(this.#limits, this.#values, this.#colors);
  }

  #renderRangeInfo(minValue = this.#values.min, maxValue = this.#values.max): string {
    return `
      <span class="min-range">min: ${minValue}</span>
      <span class="max-range">max: ${maxValue}</span>`;
  }

  #updateRangeInfo(minValue = this.#values.min, maxValue = this.#values.max): void {
    if (!this.#elements.rangeInfo) return;
    this.#elements.rangeInfo.innerHTML = this.#renderRangeInfo(minValue, maxValue);
  }

  #updateSliderState(): void {
    this.#colorSlider();
    this.#updateRangeInfo();
  }

  #renderRangeInputs(limits: { min: number; max: number }, values: { min: number; max: number }): string {
    return `
      <input class="from-slider" type="range" value="${values.min}" min="${limits.min}" max="${limits.max}"/>
      <input class="to-slider" type="range" value="${values.max}" min="${limits.min}" max="${limits.max}"/>`;
  }

  // #updateRangeInputs(limits: { min: number; max: number }, values: { min: number; max: number }): void {
  //   this.#elements.fromSlider?.setAttribute('value', String(values.min));
  //   this.#elements.fromSlider?.setAttribute('min', String(limits.min));
  //   this.#elements.fromSlider?.setAttribute('max', String(limits.max));

  //   this.#elements.toSlider?.setAttribute('value', String(values.min));
  //   this.#elements.toSlider?.setAttribute('min', String(limits.min));
  //   this.#elements.toSlider?.setAttribute('max', String(limits.max));
  // }

  #toggleAccessibleSlider(): void {
    if (!this.#elements.toSlider) return;

    const toSliderValue = Number((this.#elements.toSlider as HTMLInputElement).value);
    if (toSliderValue <= this.#limits.min) {
      this.#elements.toSlider.classList.add('to-slider-z-index-2');
    } else this.#elements.toSlider.classList.remove('to-slider-z-index-2');
  }

  render(): string {
    return `
      <div class="range-container">
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
