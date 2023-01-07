import './scss/header.styles.scss';

class HeaderComponent {
  #elements: { [key: string]: HTMLElement | null } = {};

  constructor() {
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
  }

  init(): void {
    const headerElement = document.querySelector('.main-header');
    if (!headerElement) return;

    this.#elements = {
      cartCount: headerElement.querySelector('.cart-quantity'),
      totalCost: headerElement.querySelector('.total-cost'),
    };
  }

  updateCartCount(cartCount: number | string): void {
    if (!this.#elements.cartCount) return;

    this.#elements.cartCount.textContent = `(${cartCount})`;
  }

  updateTotalCost(totalCost: number | string): void {
    if (!this.#elements.totalCost) return;

    this.#elements.totalCost.textContent = `${totalCost} $`;
  }

  render(): string {
    return `
    <header class="main-header">
      <nav class="nav">
        <a class="link logo-link" href="#">
          <svg class="logo-icon">
            <use xlink:href="assets/images/sprite.svg#WGLogo"></use>
          </svg>
          <h1 class="text logo-text">Tanks Online Store</h1>
        </a>
        <p class="total-cost-wrapper">
          <span class="text">Total cost: </span>
          <span class="text total-cost">0 $</span>
        </p>
        <a class="link cart-link" href="#/cart">
          <span class="text cart-text">Shopping cart</span>
          <span class="text cart-quantity">(0)</span>
        </a>
      </nav>
    </header>`;
  }
}

export default new HeaderComponent();
