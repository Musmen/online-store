type callback = (val: string) => void;
class PromoCode {
  private id = 'id';
  private root: HTMLElement | undefined;
  private nameView: HTMLElement | undefined;
  private btnView: HTMLButtonElement | undefined;
  private isUseBtn = false;

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

  public get IsDirty() {
    return this.isUseBtn;
  }

  public get Discount() {
    return this.discount;
  }

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
      <button class="btn__code">ADD</button>
    </div>
    `;
    return elem.trim();
  }

  private onUse = () => {
    if (this.btnView === undefined) return;
    this.isUseBtn = !this.isUseBtn;
    if (this.isUseBtn) {
      this.btnView.textContent = 'DROP';
      this.isDiscountApply = true;
      this.emit('ADD');
      return;
    } else {
      this.btnView.textContent = 'ADD';
      this.isDiscountApply = false;
      this.emit('DROP');
    }
  };

  public sub: callback | undefined;

  private emit = (val: string) => {
    if (this.sub !== undefined) {
      this.sub(val);
    }
  };
}
export default PromoCode;
