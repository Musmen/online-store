import storage from '../storage/storage';

import headerComponent from '../../../header/header';
import footerComponent from '../../../footer/footer';
import mainPageComponent from '../../../main-page/main-page';

class Controller {
  #elements: { [key: string]: HTMLElement | null } = {};

  constructor() {
    this.#elements = {
      appContainer: document.querySelector('.app'),
    };
  }

  #renderHeader(): void {
    this.#elements.appContainer?.insertAdjacentHTML('afterbegin', headerComponent.render());
  }

  #renderMainPage(): void {
    this.#elements.appContainer?.insertAdjacentHTML('beforeend', mainPageComponent.render());
  }

  #renderFooter(): void {
    this.#elements.appContainer?.insertAdjacentHTML('beforeend', footerComponent.render());
  }

  init(): void {
    this.#renderHeader();
    headerComponent.init();

    this.#renderMainPage();
    mainPageComponent.init();
    mainPageComponent.renderProducts(storage.getProducts());

    this.#renderFooter();
  }
}

export default new Controller();
