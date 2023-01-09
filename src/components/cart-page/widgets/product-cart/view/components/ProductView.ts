import { convertToRomane } from '../../../../../../common/common.helper';
import { ProductItemData } from '../../../../../../models/product-item.model';
import BaseView from '../../../../components/BaseView';
import '../../scss/product.style.scss';

type callback = (product: ProductView) => void;
class ProductView extends BaseView {
  private id = '';
  private data: ProductItemData | null = null;
  private price = 0;
  private totalPrice = 0;
  private count = 1;
  private index = 1;
  private link: string;

  private addBtn: HTMLElement | undefined;
  private currCountItems: HTMLElement | undefined;
  private removeBtn: HTMLElement | undefined;
  private priceView: HTMLElement | undefined;

  private isDirty = false;
  public get IsDirty() {
    return this.isDirty;
  }

  public get Data() {
    return this.data;
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

  public get ID() {
    return this.id;
  }

  public set Index(index: number) {
    this.index = index;
    if (this.root === null) return;
    const ind: HTMLElement | null = this.root.querySelector('.product-index span');
    if (ind !== null) {
      ind.textContent = String(index);
    }
  }

  public addCount(): void {
    this.count += 1;
    this.totalPrice += this.price;
    if (this.priceView === undefined) return;
    this.priceView.textContent = '$' + String(this.totalPrice);
    this.countView();
  }

  public constructor(data: ProductItemData, index = 1) {
    super();
    this.data = data;
    this.index = index;
    this.id = String(data.id);
    this.link = data.link;
    if (typeof data.price === 'number') {
      this.price = data.price;
      this.totalPrice = data.price;
    }
  }

  public init(): void {
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

  public render(): string {
    const root = this.item();
    return root;
  }

  private item(): string {
    if (this.data?.description === undefined) return '';
    let description = this.data.description;
    if (description.length >= 300) {
      description = description.slice(0, 300);
      description += '...';
    }
    if (this.data === undefined) return '';

    const { nation, type, tier, short_name, name } = this.data;

    const flagClassName = `flag flag_${nation}`;
    const typeClassName = `tank-type tank-type_${type?.toLowerCase()}`;

    const item = `
        <div id="${this.id}" class="item__product-cart">
          <a class="link__product-cart" href="${this.link}">
            <div class="product-index">
              <span>${this.index}</span>
            </div>
            <div class="contetnt__product-cart">
              <img class="img__item" src="${this.data.images[0]}">
              <div class="detail__item">
                <span class="title__item">${this.data.name}</span>
                <div class="type__item">
                  <span class="${flagClassName}"></span>
                  <span class="${typeClassName}"></span>
                  <span class="level">${convertToRomane(tier || 0)}</span>
                  <span class="item-name">${short_name || name}</span>
                </div>
                <p class="description__item">${description}</p>
              </div>
            </div>
          </a>
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
          <span>AMOUNT: </span>
          <span>${this.data?.amount}</span>
        </div>
        <div class="add-remove__item">
          <button class="add">+</button>
          <span class="current-count-items">1</span>
          <button class="remove">-</button>
        </div>
        <span class="price-view__item">${this.data?.price} $</span>
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
    if (this.emitAdd !== null) {
      this.emitAdd(this);
    }
    this.totalPrice += this.price;
    if (this.priceView !== undefined) {
      if (typeof this.data?.amount === 'string') {
        this.priceView.textContent = `$${this.totalPrice}`;
      } else {
        this.priceView.textContent = `$${String(this.totalPrice)}`;
      }
    }
    this.countView();
  }

  private substractPrice(): void {
    this.count--;
    this.totalPrice -= this.price;
    if (this.emitRemove !== null) {
      this.emitRemove(this);
    }
    if (this.priceView !== undefined) {
      this.priceView.textContent = `$${String(this.totalPrice)}`;
    }
    if (this.count <= 0) {
      this.count = 0;
      this.isDirty = true;
      if (this.emitRemoveProduct !== null) {
        this.emitRemoveProduct(this);
      }
    }
    this.countView();
  }

  private countView(): void {
    if (this.currCountItems === undefined) return;
    this.currCountItems.textContent = String(this.count);
  }

  public emitRemoveProduct: callback | null = null;
  public emitAdd: callback | null = null;
  public emitRemove: callback | null = null;
}

export default ProductView;
