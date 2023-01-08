import { ProductItem } from '../../../models/product-item.model';
import storage from '../../app/storage/storage';
import WPurchaseModal from '../../purchase-modal/WPurchaseModal';
import CartStoreService from '../models/CartStoreService';

class CartService {
  private cartStoreService = CartStoreService;
  private storage = storage;

  public check(): void {
    CartStoreService.init();
    const cards = document.querySelectorAll('.card');

    cards.forEach((elem) => {
      const dataId = elem.getAttribute('data-id');
      const btn = elem.querySelector('.add-cart-btn');
      if (btn !== null) {
        const check = this.cartStoreService.isCheckProductByID(Number(dataId));
        if (check) {
          btn.classList.remove('add-cart-btn_active');
        } else {
          btn.classList.add('add-cart-btn_active');
        }
      }
    });
  }

  public checkProductPage(): void {
    CartStoreService.init();
    const productPage = document.querySelector('.product-centralizer');
    if (productPage === null) return;
    const product = productPage.querySelector('.product');
    const id = product?.getAttribute('data-id');
    const btn: HTMLElement = productPage.querySelector('.cart-btn') as HTMLElement;
    const check = this.cartStoreService.isCheckProductByID(Number(id));

    if (check) {
      btn?.classList.remove('cart-btn_active');
    } else {
      btn?.classList.add('cart-btn_active');
    }
  }

  public hundlerButton(): void {
    const cards = document.querySelectorAll('.card');

    cards.forEach((elem) => {
      const btn = elem.querySelector('.add-cart-btn');
      btn?.addEventListener('click', this.onButton);
    });
  }

  public unmountButtons(): void {
    const cards = document.querySelectorAll('.card');

    cards.forEach((elem) => {
      const btn = elem.querySelector('.add-cart-btn');
      btn?.removeEventListener('click', this.onButton);
    });
  }

  private onButton = (event: Event) => {
    if (!(event.target instanceof HTMLElement)) return;
    const target = event.target;
    const root = target.closest('.card');
    if (root !== null) {
      const link: HTMLAnchorElement | null = root?.querySelector('a');
      if (link === null) return;

      const dataId = root.getAttribute('data-id');
      const product = this.findProduct(Number(dataId));
      if (!product) return;
      if (target.classList.contains('add-cart-btn_active')) {
        this.addProductToCartStorage(product, link.href);
        target.classList.toggle('add-cart-btn_active');
      } else {
        this.removeProductsByID(product);
        target.classList.toggle('add-cart-btn_active');
      }
    }
  };

  private findProduct(id: number | null): ProductItem | undefined {
    if (id === null) return undefined;
    const result = this.storage.getAllProducts().find((item: ProductItem) => id === item.id);
    return result;
  }

  private addProductToCartStorage(product: ProductItem, link: string): void {
    this.cartStoreService.add(product, link);
  }

  private removeProductsByID(product: ProductItem): void {
    this.cartStoreService.removeAllProductsByID(Number(product.id));
  }

  public launchingModalWindow(id: number, link: string): void {
    const find = CartStoreService.Products.find((prod) => id === prod.id);
    if (find) {
      this.callModalWindow();
    } else {
      const products = storage.getAllProducts();
      const getProd = products.find((prod) => prod.id === id);
      console.log(products);

      if (getProd !== undefined) {
        CartStoreService.add(getProd, link);
        this.callModalWindow();
      }
    }
  }

  private callModalWindow(): void {
    window.location.href = '#/cart';
    window.addEventListener('hashchange', this.onModal);
  }

  private onModal = () => {
    const w = new WPurchaseModal();
    document.querySelector('.router-page-container')?.insertAdjacentHTML('beforeend', w.render());
    w.init();
    window.removeEventListener('hashchange', this.onModal);
  };
}

export default CartService;
