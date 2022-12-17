import headerComponent from '../../header/header';
import footerComponent from '../../footer/footer';

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

  #renderFooter(): void {
    this.#elements.appContainer?.insertAdjacentHTML('beforeend', footerComponent.render());
  }

  init(): void {
    this.#renderHeader();
    headerComponent.init();

    this.#renderFooter();
  }
}

export default new Controller();
