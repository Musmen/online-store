import StateButton from '../enums/StateButton';

type callback = (val: boolean, promoCode: PromoCode) => void;
class PromoCode {
  private id = 'id';
  private root: HTMLElement | undefined;
  private nameView: HTMLElement | undefined;
  private btnView: HTMLButtonElement | undefined;

  private name: string; // example >> Rolling Scopes School - 10%
  private discount = 10; // procentag
  private isDiscountApply = false;
  public get IsDiscountApply() {
    return this.isDiscountApply;
  }

  public get Root() {
    return this.root;
  }

  public get ID() {
    return this.id;
  }

  public get Discount() {
    return this.discount;
  }

  private stateButton: StateButton = StateButton.ADD;

  public constructor(id: string, name: string, discount = 10) {
    this.id = id;
    this.name = name;
    this.discount = discount;
  }

  public init(): void {
    const root: HTMLElement | null = document.querySelector(`#${this.id}`);
    if (root === null) return;
    const name: HTMLElement | null = root.querySelector(`.name__code`);
    const btn: HTMLButtonElement | null = root.querySelector(`.btn__code`);
    if (name !== null && btn !== null) {
      this.nameView = name;
      btn.addEventListener('click', this.onUse);
      this.btnView = btn;
      this.root = root;
    }
  }

  public unmount(): void {
    this.btnView?.removeEventListener('click', this.onUse);
  }

  public make(): string {
    const elem = `
    <div id="${this.id}" class="code__total-cart">
      <span class="name__code">${this.name} - ${this.discount}%</span>
      <button class="btn__code">${this.stateButton}</button>
    </div>
    `;
    return elem.trim();
  }

  private onUse = () => {
    if (this.btnView === undefined) return;
    this.changeStateButton();
    this.btnView.textContent = this.stateButton;
  };

  public sub: callback | undefined;

  private emit = (val: boolean, promoCode: PromoCode) => {
    if (this.sub !== undefined) {
      this.sub(val, promoCode);
    }
  };

  private changeStateButton(): void {
    switch (this.stateButton) {
      case StateButton.ADD:
        this.stateButton = StateButton.DROP;
        this.isDiscountApply = true;
        this.emit(this.isDiscountApply, this);
        break;
      case StateButton.DROP:
        this.stateButton = StateButton.ADD;
        this.isDiscountApply = false;
        this.emit(this.isDiscountApply, this);
        break;
    }
  }
}
export default PromoCode;
