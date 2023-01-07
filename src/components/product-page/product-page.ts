import './scss/product-page.styles.scss';

import initSwipers from './components/swiper/swiper';
import productsService from '../../services/products.service';
import { convertToRomane } from '../../common/common.helper';
import { ProductItem } from '../../models/product-item.model';
import { Breadcrumbs } from './models/breadcrumbs.model';
import CartService from '../cart-page/service/CartService';
import CartStoreService from '../cart-page/models/CartStoreService';
import storage from '../app/storage/storage';
import WPurchaseModal from '../purchase-modal/WPurchaseModal';

class ProductPageComponent {
  #elements: { [key: string]: HTMLElement | null } = {};
  private cartService = new CartService();
  private cartStoreService = CartStoreService;
  private storage = storage;
  constructor() {
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
  }

  init(): void {
    this.#elements = {
      cartButton: document.querySelector('.cart-btn'),
      purchaseButton: document.querySelector('.purchase-btn'),
    };

    this.handlers(); // Doonn
    initSwipers();
  }
  // Doonn
  unmount(): void {
    this.#elements.cartButton?.removeEventListener('click', this.onBtn);
    this.#elements.purchaseButton?.removeEventListener('click', this.onPurchase);
  }
  // Doonn
  private handlers(): void {
    this.#elements.cartButton?.addEventListener('click', this.onBtn);
    this.#elements.purchaseButton?.addEventListener('click', this.onPurchase);
  }
  // Doonn
  private onBtn = (event: Event) => {
    if (!(event.target instanceof HTMLElement)) return;

    const target = event.target;
    const root = target.closest('.product');
    if (root === null) return;
    const id = root.getAttribute('data-id');
    const link = window.location.hash;
    const result = this.storage.getProducts().find((item) => Number(id) === item.id);
    if (result === undefined) return;

    if (this.cartStoreService.isCheckProductByID(Number(id))) {
      this.cartStoreService.removeAllProductsByID(Number(id));
      target.classList.toggle('cart-btn_active');
    } else {
      this.cartStoreService.add(result, link);
      target.classList.toggle('cart-btn_active');
    }
  };
  // Doonn
  private onPurchase = () => {
    const root: HTMLElement | undefined | null = this.#elements.cartButton?.closest('.router-page-container');
    if (root === null || root === undefined) return;
    const w = new WPurchaseModal();
    root.insertAdjacentHTML('beforeend', w.render());
    w.init();
  };

  #renderSwiperSlides(images: string[], imageClassName: string, name: string): string {
    return images
      .map(
        (image) => `
          <div class="swiper-slide">
            <img class="swiper-image ${imageClassName}" src="${image}" alt="Image of ${name}">
          </div>`
      )
      .join('');
  }

  #renderBreadcrumbs(breadcrumbs: Breadcrumbs[]): string {
    return breadcrumbs
      .map(
        ({ path, pageName }) => `
          <li class="list__item breadcrumbs__item">
            <a class="link breadcrumbs__link" ${path ? `href="${path}"` : ''}>${pageName}</a>
          </li>`
      )
      .join('');
  }

  render(): string {
    const product: ProductItem | null = productsService.getCurrentProduct();

    if (!product) {
      window.location.hash = '#';
      return '';
    }

    const { id, name, short_name, price, tier, nation, type, images, amount, description } = product;

    const flagClassName = `flag flag_${nation}`;
    const typeClassName = `tank-type tank-type_${type?.toLowerCase()}`;

    const isInCart = Math.random() > 0.5 ? true : false;

    const breadcrumbsList: Breadcrumbs[] = [
      { path: '#', pageName: 'shop' },
      { path: `#/?nation=${nation}`, pageName: nation },
      { path: `#/?type=${type}`, pageName: type },
      { path: '', pageName: short_name || name },
    ];

    return `
      <div class="product-centralizer">
        <article class="product" data-id="${id}">
          <ul class="list product__breadcrumbs">
            ${this.#renderBreadcrumbs(breadcrumbsList)}
          </ul>
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
            <img class="product-image" src="${images[0]}" alt="Image of ${name}">
          </div>
          <div class="product-description">
            <h3 class="product-description__title">Details</h3>
            <p class="product-description__text">${description}</p>
          </div>
          <h3 class="product-description__title">Gallery</h3>
          <div class="product-swipers-container">
            <div class="swiper thumbs-swiper">
              <div class="swiper-wrapper thumbs-swiper-wrapper">
                ${this.#renderSwiperSlides(images.slice(1), 'thumbs-swiper-image', name)}
              </div>
            </div>
            <div class="swiper posters-swiper"> 
              <div class="swiper-wrapper posters-swiper-wrapper">
                ${this.#renderSwiperSlides(images.slice(1), 'posters-swiper-image', name)}
              </div>
              <div class="swiper-pagination posters-swiper-pagination"></div>
            </div>
          </div>
        </article>
      </div>`;
  }
}

export default new ProductPageComponent();
