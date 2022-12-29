import { ProductItem } from '../../../../../models/product-item.model';
import '../scss/product.style.scss';
type callback = () => void;

class Product {
  private id = '';
  private root: HTMLElement | undefined;
  private data: ProductItem | undefined;
  private price = 0;
  private totalPrice = 0;
  private count = 1;
  private index = 1;

  private addBtn: HTMLElement | undefined;
  private currCountItems: HTMLElement | undefined;
  private removeBtn: HTMLElement | undefined;
  private priceView: HTMLElement | undefined;

  private isDirty = false;
  public get IsDirty() {
    return this.isDirty;
  }

  public get Root() {
    return this.root;
  }

  public get Price() {
    return this.totalPrice;
  }

  public get Count() {
    return this.count;
  }

  public constructor(id: string, data: ProductItem, index = 1) {
    this.data = data;
    this.index = index;
    this.id = id;
    if (typeof data.price === 'number') {
      this.price = data.price;
      this.totalPrice = data.price;
    }
  }

  public init(): void {
    // const root: HTMLElement | null = document.querySelector('.item__product-cart');
    const root: HTMLElement | null = document.getElementById(`${this.id}`);
    if (root === null) return;
    const addBtn: HTMLElement | null = root.querySelector(`.add`);
    const currCountItems: HTMLElement | null = root.querySelector('.current-count-items');
    const removeBtn: HTMLElement | null = root.querySelector('.remove');
    const priceView: HTMLElement | null = root.querySelector('.price-view__item');
    this.root = root;
    if (addBtn !== null && removeBtn !== null && currCountItems !== null && priceView !== null) {
      this.addBtn = addBtn;
      this.currCountItems = currCountItems;
      this.removeBtn = removeBtn;
      this.priceView = priceView;
    }
    this.events();
  }

  private events(): void {
    this.addBtn?.addEventListener('click', this.onAdd);
    this.removeBtn?.addEventListener('click', this.onRemove);
  }

  public unmount(): void {
    this.addBtn?.removeEventListener('click', this.onAdd);
    this.removeBtn?.removeEventListener('click', this.onRemove);
  }

  public make(): string {
    const root = this.item();
    return root;
  }

  private item(): string {
    if (this.data?.description === undefined) return '';
    let description = this.data.description;
    if (description.length >= 10) {
      const num = Math.floor((description.length / 100) * 80);
      description = description.slice(0, -num);
      description += '....';
    }
    if (this.data === undefined) return '';
    const item = `
        <div id="${this.id}" class="item__product-cart">
          <div class="product-index">
            <span>${this.index}</span>
          </div>
          <div>
            <img class="img__item" src="${this.data.images[0]}">
            <div class="detail__item">
              <span class="title__item">${this.data.name}</span>
              <p class="description__item">${description}</p>
              <div class="type__item">
                <span>${this.data.nation.toUpperCase()}</span>
                <span>${this.data.type.toUpperCase()}</span>
              </div>
            </div>
          </div>
          ${this.control()}
        </div>
      `;
    return item.trim();
  }

  private control(): string {
    if (this.data === undefined) return '';
    const elem = `
      <div class="control__item">
        <div class="amount__item">
          <span>AMOUNT:</span>
          <span>${this.data.amount}</span>
        </div>
        <div class="add-remove__item">
          <button class="add">+</button>
          <span class="current-count-items">1</span>
          <button class="remove">-</button>
        </div>
        <span class="price-view__item">$${this.data.price}</span>
      </div>
    `;
    return elem.trim();
  }

  private onAdd = () => {
    this.addPrice();
  };

  private onRemove = () => {
    this.substractPrice();
  };

  private addPrice(): void {
    if (this.data?.amount === undefined) return;
    if (this.count >= this.data?.amount) {
      this.count = typeof this.data?.amount === 'string' ? Number(this.data?.amount) : this.data?.amount;
      return;
    }

    this.count++;
    this.totalPrice += this.price;
    if (this.priceView !== undefined) {
      if (typeof this.data?.amount === 'string') {
        this.priceView.textContent = `$${this.totalPrice}`;
      } else {
        this.priceView.textContent = `$${String(this.totalPrice)}`;
      }
    }
    this.countView();
    if (this.emitAdd !== undefined) {
      this.emitAdd();
    }
  }

  private substractPrice(): void {
    this.count--;
    this.totalPrice -= this.price;
    if (this.priceView !== undefined) {
      this.priceView.textContent = `$${String(this.totalPrice)}`;
    }
    if (this.count <= 0) {
      this.count = 0;
      this.isDirty = true;
      if (this.emitRemove !== undefined) {
        this.emitRemove(); // испустить сигнал когда итем нужно удалить
      }
    }
    this.countView();
    if (this.emitAdd !== undefined) {
      this.emitAdd();
    }
  }

  private countView(): void {
    if (this.currCountItems === undefined) return;
    this.currCountItems.textContent = String(this.count);
  }

  public emitRemove: callback | undefined; // вызов функции на верхнем уровне
  public emitAdd: callback | undefined;
}

export default Product;
