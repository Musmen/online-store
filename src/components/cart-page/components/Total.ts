import '../scss/total.style.scss';
import PromoCode from './PromoCode';

class Total {
  private root: HTMLElement | undefined;
  private promoCodesView: HTMLElement | undefined;
  private promoInput: HTMLInputElement | undefined;
  private priceContainer: HTMLElement | undefined;
  private totalCountsView: HTMLElement | undefined;
  private count = 1;

  private priceView: HTMLElement | undefined;
  private price = 200;
  private newPriceBlock: HTMLElement | undefined;
  private newPriceView: HTMLElement | undefined;
  private newPrice = 0;

  public init(): void {
    const root: HTMLElement | null = document.querySelector('.total-cart');
    if (root === null) return;
    const promoCodes: HTMLElement | null = root?.querySelector('.promo-codes__total-cart');
    const promoInput: HTMLInputElement | null = root.querySelector('.promo__total-cart input');
    const priceView: HTMLElement | null = root.querySelector('.price__total-cart .price');
    const priceContainer: HTMLElement | null = root.querySelector('.price-container');
    const totalCountsView: HTMLElement | null = root.querySelector('.counts__total-cart');
    if (
      promoCodes !== null &&
      promoInput !== null &&
      priceView !== null &&
      priceContainer !== null &&
      totalCountsView !== null
    ) {
      this.promoCodesView = promoCodes;
      this.promoInput = promoInput;
      this.priceView = priceView;
      this.priceContainer = priceContainer;
      this.totalCountsView = totalCountsView;
      this.root = root;
      promoInput.addEventListener('input', this.onInputSearch);
    }
  }

  public unmount(): void {
    this.promoInput?.removeEventListener('input', this.onInputSearch);
  }

  public make(): string {
    const elem = `
    <div class="wraper-total-cart">
      <div class="total-cart">
        <h2 class="title__total-cart">Summary</h2>
        <div class="content__total-cart">
          <div class="products__total-cart">
            <span>Products:</span>
            <span class="counts__total-cart">${this.count}</span>
          </div>
          <div class="price-container">
            <div class="price__total-cart">
              <span>Total:</span>
              <span class="price">$${this.price}</span>
            </div>
          </div>
          <div class="promo__total-cart">
            <input type="search" placeholder="Enter promo code">
          </div>
          <div class="promo-codes__total-cart">
          </div>
          <button class="btn__total-cart">BUY NOW</button>
        </div>
      </div>
    </div>
    `;
    return elem.trim();
  }

  private makeNewPriceView(): string {
    const elem = `
      <div class="price__total-cart new-price">
        <span>Total:</span>
        <span class="price">$${this.newPrice}</span>
      </div>
    `;
    return elem.trim();
  }

  public setPrice(price: number): void {
    if (this.priceView === undefined) return;
    this.price = price;
    this.priceView.textContent = '$' + String(price);
  }

  public setProductCount(count: number): void {
    if (this.totalCountsView === undefined) return;
    this.count = count;
    this.totalCountsView.textContent = String(count);
  }

  // block promo code
  private promoCodes = {
    rs: 'rs',
    lal: 'lal',
    dv: 'dv',
  };

  private onInputSearch = () => {
    let findElem = '';
    const promos: string[] = Object.keys(this.promoCodes);
    for (let i = 0; i < promos.length; i++) {
      const elem = promos[i];
      if (this.promoInput?.value === elem) {
        findElem = elem;
        break;
      }
    }

    if (findElem === '') {
      this.hidePromoCode();
    } else {
      this.comparison(findElem);
    }
  };

  private comparison(elem: string): void {
    switch (true) {
      case elem === this.promoCodes.rs:
        this.showPromoCode(elem, 'Rolling Scopes School');
        break;
      case elem === this.promoCodes.lal:
        this.showPromoCode(elem, 'Lola Lolku Lutala');
        break;
      case elem === this.promoCodes.dv:
        this.showPromoCode(elem, 'Devs');
        break;
    }
  }
  private promos: PromoCode[] = [];
  private showPromoCode(elem: string, value: string): void {
    const searchDuplicate = this.promos.find((x) => x.ID === elem);
    if (searchDuplicate) return;

    const promo: PromoCode = new PromoCode(elem, value, 20);
    this.promoCodesView?.insertAdjacentHTML('beforeend', promo.make());
    promo.init();
    promo.sub = this.onUsePromo;
    this.promos.push(promo);
  }

  private hidePromoCode(): void {
    for (let i = 0; i < this.promos.length; i++) {
      const promo = this.promos[i];
      if (promo.IsDirty) continue;
      promo.unmount();
      promo.Root?.remove();
      this.promos.splice(i, 1);
    }
  }

  private sumDiscount = 0;
  private onUsePromo = (val: string) => {
    if (this.priceView === undefined) return;
    if (val === 'ADD') {
      this.sumDiscount = this.calcDiscount();
      this.insertNewPrice();
    } else if (val === 'DROP') {
      this.sumDiscount = this.calcDiscount();
      this.removePromoCode();
    }

    const getProcent = (this.price / 100) * this.sumDiscount;
    this.newPrice = this.price - getProcent;

    if (this.newPriceView !== undefined) {
      this.newPriceView.textContent = `$${this.newPrice}`;
    }
  };

  private calcDiscount(): number {
    let result = 0;
    for (let i = 0; i < this.promos.length; i++) {
      const promo = this.promos[i];
      if (promo.IsDiscountApply) {
        result += promo.Discount;
      }
    }
    return result;
  }

  private removePromoCode(): void {
    for (let i = 0; i < this.promos.length; i++) {
      const promo = this.promos[i];
      if (!promo.IsDiscountApply) {
        promo.unmount();
        promo.Root?.remove();
        this.promos.splice(i, 1);
      }
    }

    if (this.promos.length <= 0) {
      console.log(this.newPriceBlock);
      this.newPriceBlock?.remove();
      this.priceContainer?.querySelector('.price__total-cart')?.classList.remove('old-price');
      this.newPriceBlock = undefined;
      return;
    }
  }

  private insertNewPrice(): void {
    if (this.priceContainer === undefined) return;
    if (this.newPriceBlock !== undefined) return;

    this.priceContainer.insertAdjacentHTML('beforeend', this.makeNewPriceView());
    const elem: HTMLElement | null = this.priceContainer.querySelector('.new-price');
    if (elem === null) return;
    this.newPriceView = elem.querySelector('.price') as HTMLElement;
    this.newPriceBlock = elem;
    this.priceContainer.querySelector('.price__total-cart')?.classList.add('old-price');
  }
}

export default Total;
