import { convertToRomane } from '../../common/common.helper';
import EventBus from '../../eventbus/EventBus';
import { ProductItem } from '../../models/product-item.model';

export default class ProductItemComponent {
  #product: ProductItem | null = null;

  constructor(product: ProductItem) {
    this.#product = product;
    this.render = this.render.bind(this);
  }

  private id: string | number = 0;
  private root: HTMLElement | null = null;
  private btn: HTMLButtonElement | null = null;
  private link = '#';
  private isInCart = false;
  public init(): void {
    const root: HTMLElement | null = document.querySelector(`[data-id="${this.id}"]`);
    if (root === null) return;
    const btn: HTMLButtonElement | null = root.querySelector('.add-cart-btn');
    btn?.addEventListener('click', this.onButton);
    this.btn = btn;
    this.root = root;
  }

  public unmount(): void {
    this.btn?.removeEventListener('click', this.onButton);
  }

  render(): string {
    if (!this.#product) return '';

    const { id, name, short_name, price, tier, nation, type, images, amount } = this.#product;
    this.id = id;

    const flagClassName = `flag flag_${nation}`;
    const typeClassName = `tank-type tank-type_${type?.toLowerCase()}`;

    const linkToProductPage = `#/product/${id}`;
    this.link = linkToProductPage;
    const isInCart = Math.random() > 0.5 ? true : false;
    this.isInCart = isInCart;
    return `
      <article class="card" data-id="${id}">
        <a href="${linkToProductPage}" class="card-info">
          <img class="card-img" src="${images[0]}" alt="Image of ${name}">
          <div class="card-specifications">
            <h2 class="item-text">
              <span class="${flagClassName}"></span>
              <span class="${typeClassName}"></span>
              <span class="level">${convertToRomane(tier || 0)}</span>
              <span class="item-name">${short_name || name}</span>
            </h2>
            <div class="card-wrapper">
              <p class="price">${price} $</p>
              <p class="amount">AMOUNT: ${amount}</p>
            </div>
          </div>
        </a>
        <button class="add-cart-btn ${isInCart ? 'add-cart-btn_active' : ''}">Cart</button>
      </article>`;
  }

  private onButton = () => {
    if (this.#product === null) return;
    EventBus.emit<ProductItem, string>('product', this.#product, this.link);
  };
}
