import { convertToRomane } from '../../common/common.helper';
import { PRICE_POSTFIX } from '../../common/common.constants';
import { ProductItem } from '../../models/product-item.model';

export default class ProductItemComponent {
  #product: ProductItem | null = null;

  constructor(product: ProductItem) {
    this.#product = product;
    this.render = this.render.bind(this);
  }

  render(): string {
    if (!this.#product) return '';

    const { id, name, short_name, price, tier, nation, type, images, amount } = this.#product;

    const flagClassName = `flag flag_${nation}`;
    const typeClassName = `tank-type tank-type_${type?.toLowerCase()}`;

    const linkToProductPage = `#/product/${id}`;
    const isInCart = Math.random() > 0.5 ? true : false;

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
              <p class="price">${price} ${PRICE_POSTFIX}</p>
              <p class="amount">AMOUNT: ${amount}</p>
            </div>
          </div>
        </a>
        <button class="add-cart-btn ${isInCart ? 'add-cart-btn_active' : ''}">Cart</button>
      </article>`;
  }
}
