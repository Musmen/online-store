import './scss/header.styles.scss';

class HeaderComponent {
  #elements: { [key: string]: HTMLElement | null } = {};

  constructor() {
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
  }

  init(): void {
    console.log('Init Header');
  }

  render(): string {
    return `
      <header class="main-header">
        <h1>Logo from Main Header</h1>
        <nav class="navigation main-header__navigation">
          <ul class="list navigation-list main-header__navigation-list">
            <li class="navigation-item main-header__navigation-item">
              <a class="navigation-link main-header__navigation-link" href="#/">MainPage</a>
            </li>
            <li class="navigation-item main-header__navigation-item">
              <a class="navigation-link main-header__navigation-link" href="#/cart">CartPage</a>
            </li>
            <li class="navigation-item main-header__navigation-item">
              <a class="navigation-link main-header__navigation-link" href="#/product">ProductPage</a>
            </li>
            <li class="navigation-item main-header__navigation-item">
              <a class="navigation-link main-header__navigation-link" href="#/notfound">404 Page</a>
            </li>
          </ul>
        </nav>
        <hr>
      </header>
    `;
  }
}

export default new HeaderComponent();
