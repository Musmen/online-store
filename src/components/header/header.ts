import EventBus from '../../eventbus/EventBus';
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

    EventBus.subscribe(this, 'price', this.onPrice);
    EventBus.subscribe(this, 'counts', this.onCounts);
  }

  private onPrice = (price: unknown) => {
    if (typeof price !== 'number') return;
    this.updateTotalCost(price);
  };
  private onCounts = (counts: unknown) => {
    if (typeof counts !== 'number') return;
    this.updateCartCount(counts);
  };

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
      <h1 class="visually-hidden">Tanks Online Store</h1>
      <nav class="nav">
        <a class="link logo-link" href="#">
          <svg class="logo-icon">
            <use xlink:href="assets/images/logo.svg#WGLogo"></use>
          </svg>
          <span class="text logo-text">Online Store</span>
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
