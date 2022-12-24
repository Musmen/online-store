import './scss/product-page.styles.scss';
import productsService from '../../services/products.service';
import { convertToRomane } from '../../common/common.helper';
import { ProductItem } from '../../models/product-item.model';

class ProductPageComponent {
  #elements: { [key: string]: HTMLElement | null } = {};

  constructor() {
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
  }

  init(): void {
    this.#elements = {
      cartButton: document.querySelector('.cart-btn'),
      purchaseButton: document.querySelector('.purchase-btn'),
    };
  }

  render(): string {
    const product: ProductItem | null = productsService.getCurrentProduct();

    // this.#swiper = product.images.length > 1 ? new Swiper() : null;
    if (!product) {
      window.location.hash = '#';
      return '';
    }

    const { id, name, short_name, price, tier, nation, type, images, amount, description } = product;

    const flagClassName = `flag flag_${nation}`;
    const typeClassName = `tank-type tank-type_${type?.toLowerCase()}`;

    const isInCart = Math.random() > 0.5 ? true : false;

    const productImages = `<img class="product-image" src="${images[0]}" alt="Image of ${name}">`;

    return `
      <div class="product-centralizer">
        <article class="product" data-id="${id}">
          <div class="product__main-info">
            <div class="product-specifications">
              <h2 class="product-title">${name}</h2>
              <h2 class="product-text">
                <span class="${flagClassName}"></span>
                <span class="${typeClassName}"></span>
                <span class="level">${convertToRomane(tier || 0)}</span>
                <span class="product-name">${short_name || name}</span>
              </h2>
              <div class="product-wrapper">
                  <p class="price">${price} $</p>
                  <p class="amount">amount: ${amount}</p>
              </div>
              <div class="product__controls">
                <button class="cart-btn ${isInCart ? 'cart-btn_active' : ''}">Add To Cart</button>
                <button class="purchase-btn">Purchase</button>
              </div>
            </div>
            ${productImages}
          </div>
          <div class="product-description">
            <h3 class="product-description__title">Details</h3>
            <p class="product-description__text">${description}</p>
          </div>
        </article>
      </div>`;
  }
}

export default new ProductPageComponent();
