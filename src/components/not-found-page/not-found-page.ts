import './scss/not-found-page.styles.scss';

import { REPEAT_TEMPLATE_TIMES, TEMPLATE_ERROR_MESSAGE } from './common/not-found-page.constants';

class NotFoundPageComponent {
  #errorMessage = '';

  constructor() {
    this.#errorMessage = TEMPLATE_ERROR_MESSAGE.repeat(REPEAT_TEMPLATE_TIMES);
  }

  render(): string {
    return `
      <div class="error-wrapper">
        <p class="error-inner">${this.#errorMessage}</p>
      </div>`;
  }
}

export default new NotFoundPageComponent();
