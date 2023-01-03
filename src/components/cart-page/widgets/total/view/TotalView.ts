import PromoCode from '../components/PromoCode';
import TotalController from '../controller/TotalController';
import { template } from '../template/template';

class TotalView {
  private controller: TotalController;
  private root: HTMLElement | null = null;
  private price: HTMLElement | null = null;
  private amount: HTMLElement | null = null;
  private input: HTMLInputElement | null = null;
  private containerPromoCode: HTMLElement | null = null;
  private containerPrice: HTMLElement | null = null;
  public set Price(price: number) {
    if (this.price === null) return;
    this.price.textContent = '$' + String(price);
  }

  public set Amount(amount: number) {
    if (this.amount === null) return;
    this.amount.textContent = String(amount);
  }

  constructor(controller: TotalController) {
    this.controller = controller;
  }

  public init(): void {
    this.root = document.querySelector('.wraper-total-cart');
    if (this.root === null) return;
    this.amount = this.root.querySelector('.counts__total-cart');
    this.containerPrice = this.root.querySelector('.price-container');
    this.price = this.root.querySelector('.price__total-cart .price');
    this.input = this.root.querySelector('.promo__total-cart input');
    this.containerPromoCode = this.root.querySelector('.promo-codes__total-cart');
    this.enable();
  }

  public unmount(): void {
    this.disable();
  }

  private enable(): void {
    this.input?.addEventListener('input', this.onInput);

    if (this.promoCodeViewArr.length > 0) {
      this.renderAllPromoCode();
    }
  }

  private disable(): void {
    this.input?.removeEventListener('input', this.onInput);
    this.removeNewPrice();
  }

  public render(): string {
    return template();
  }

  private onInput = () => {
    if (this.input === null) return;
    this.controller.searchPromoCode(this.input.value);
  };

  private promoCodeViewArr: PromoCode[] = [];
  public setPromoCode(promo: PromoCode): void {
    const find = this.promoCodeViewArr.find((elem) => elem.ID === promo.ID);
    if (find) return;

    this.renderPromoCode(promo);
  }

  private renderPromoCode(promo: PromoCode): void {
    this.containerPromoCode?.insertAdjacentHTML('beforeend', promo.make());
    promo.init();
    promo.sub = this.onPromo;
    this.promoCodeViewArr.push(promo);
  }

  private renderAllPromoCode(): void {
    for (let i = 0; i < this.promoCodeViewArr.length; i++) {
      const promo = this.promoCodeViewArr[i];
      this.containerPromoCode?.insertAdjacentHTML('beforeend', promo.make());
      promo.init();
      promo.sub = this.onPromo;
    }

    if (this.containerPrice === null) return;
    this.containerPrice.insertAdjacentHTML('beforeend', this.makeNewPrice());
    this.newPriceBlock = this.containerPrice.querySelector('.new-price');
    if (this.newPriceBlock === null) return;
    this.newPrice = this.newPriceBlock.querySelector('.price');
    if (this.newPrice !== null) {
      this.newPrice.textContent = '$' + String(this.tempNewPrice);
    }
    this.containerPrice.querySelector('.price__total-cart')?.classList.add('old-price');
  }

  public removePromoCode(): void {
    for (let i = 0; i < this.promoCodeViewArr.length; i++) {
      const promo = this.promoCodeViewArr[i];
      if (!promo.IsDiscountApply) {
        promo.unmount();
        promo.Root?.remove();
        this.promoCodeViewArr.splice(i, 1);
      }
    }
  }

  private onPromo = (val: boolean, promoCode: PromoCode) => {
    if (val) {
      // add
      this.insertNewPrice();
      if (this.input !== null) {
        this.input.value = '';
      }
      this.controller.applyDiscount(promoCode.ID);
    } else {
      // drop
      this.controller.dropDiscount(promoCode.ID);
      promoCode.unmount();
      promoCode.Root?.remove();
      for (let i = 0; i < this.promoCodeViewArr.length; i++) {
        const promo = this.promoCodeViewArr[i];
        if (promo.ID === promoCode.ID) {
          this.promoCodeViewArr.splice(i, 1);
        }
        this.removeNewPrice();
      }
      if (this.input !== null) {
        this.input.value = '';
      }
    }
  };

  private tempNewPrice = 0;
  public updateNewPrice(price: number): void {
    this.tempNewPrice = price;
    if (this.newPrice === null) return;
    this.newPrice.textContent = '$' + String(price);
  }

  private makeNewPrice(): string {
    const elem = `
      <div class="price__total-cart new-price">
        <span>Total:</span>
        <span class="price">$0</span>
      </div>
    `;
    return elem.trim();
  }

  private newPriceBlock: HTMLElement | null = null;
  private newPrice: HTMLElement | null = null;
  private insertNewPrice(): void {
    if (this.containerPrice === null) return;
    if (this.newPriceBlock !== null) return;
    this.containerPrice.insertAdjacentHTML('beforeend', this.makeNewPrice());
    this.newPriceBlock = this.containerPrice.querySelector('.new-price');
    if (this.newPriceBlock === null) return;
    this.newPrice = this.newPriceBlock.querySelector('.price');
    this.containerPrice.querySelector('.price__total-cart')?.classList.add('old-price');
  }

  private removeNewPrice(): void {
    if (this.promoCodeViewArr.length <= 0) {
      this.newPriceBlock?.remove();
      this.newPriceBlock = null;
      this.containerPrice?.querySelector('.price__total-cart')?.classList.remove('old-price');
    }
  }
}

export default TotalView;
