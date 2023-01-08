import '../../scss/product-cart.style.scss';
import BaseView from '../../../../components/BaseView';

class NewProductCartView extends BaseView {
  private controlComponent: string | null = null;
  private containerProduct: HTMLElement | null = null;
  public init(): void {
    this.root = document.querySelector('.product-cart');
    if (this.root === null) return;
    this.containerProduct = this.root?.querySelector('.container__product-cart');
  }
  public unmount(): void {
    throw new Error('Method not implemented.');
  }
  public render(): string {
    const elem = `
      <div class="product-cart">
        ${this.controlComponent}
        <div class="container__product-cart"></div>
      </div>
    `;
    return elem.trim();
  }

  public bindControlComponent(component: string): void {
    this.controlComponent = component;
  }

  public addItem(item: string): void {
    this.containerProduct?.insertAdjacentHTML('beforeend', item);
  }
}

export default NewProductCartView;
