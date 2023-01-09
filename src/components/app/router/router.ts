import productService from '../../../services/products.service';

import { findPageByPath, getLocationPath } from './common/router.helper';
import { PATHS } from './common/router.constants';
import routes from './routes/routes';

import { Page } from './models/page.model';

class Router {
  #mainContainer: HTMLElement | null = null;
  #previousPage: Page | null = null;

  constructor() {
    this.route = this.route.bind(this);
  }

  init(): void {
    this.#mainContainer = document.querySelector('.router-page-container');
    window.addEventListener('hashchange', this.route);
    this.route();
  }

  route(): void {
    if (!this.#mainContainer) return;

    if (this.#previousPage && this.#previousPage.unmount) this.#previousPage.unmount();

    let currentPath = getLocationPath();

    if (currentPath.startsWith(PATHS.PRODUCT)) {
      const productId = currentPath.slice(1).split('/').pop();
      productService.updateCurrentProduct(productId);
      currentPath = productService.getCurrentProduct() ? PATHS.PRODUCT : PATHS.NOT_FOUND;
    }

    const { page } = findPageByPath(routes, currentPath);
    this.#previousPage = page;

    this.#mainContainer.innerHTML = '';

    const pageMarkup: string = page.render();
    this.#mainContainer.insertAdjacentHTML('afterbegin', pageMarkup);
    if (page.init) page.init();
  }
}

export default new Router();
