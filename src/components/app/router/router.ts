import routes from './routes/routes';
import { findPageByPath, getLocationPath } from './common/router.helper';
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
    const currentPath = getLocationPath();

    const { page } = findPageByPath(routes, currentPath);
    this.#previousPage = page;

    this.#mainContainer.innerHTML = '';

    const pageMarkup: string = page.render();
    this.#mainContainer.insertAdjacentHTML('afterbegin', pageMarkup);
    if (page.init) page.init();
  }
}

export default new Router();
