import BaseView from '../../../components/BaseView';
import ControlView from './components/ControlView';
import '../scss/product-cart.style.scss';
import ProductView from './components/ProductView';
import ProductCartController from '../controller/ProductCartController';

class ProductCartView extends BaseView {
  private controller: ProductCartController;
  private control: ControlView;

  private containerItem: HTMLElement | null = null;

  public constructor(controller: ProductCartController) {
    super();
    this.controller = controller;
    this.control = new ControlView(controller);
    this.insert = this.insert.bind(this);
  }

  public init(): void {
    this.root = document.querySelector('.product-cart');
    if (this.root === null) return;
    this.containerItem = this.root.querySelector('.container__product-cart');
    this.control.init();
  }

  public unmount(): void {
    this.control.unmount();
  }

  public render(): string {
    const elem = `
      <div class="product-cart">
        ${this.control.render()}
        <div class="container__product-cart"></div>
      </div>
    `;
    return elem.trim();
  }

  public insert(product: ProductView): void {
    this.containerItem?.insertAdjacentHTML('beforeend', product.render());
    product.init();
    product.emitRemoveProduct = this.onRemoveProduct;
    product.emitAdd = this.onAdd;
    product.emitRemove = this.onRemove;
    this.control.setProducts(this.controller.ProductArr);
  }

  private onRemoveProduct = (product: ProductView) => {
    product.unmount();
    product.Root?.remove();
    product.emitRemoveProduct = null;
    product.emitAdd = null;
    product.emitRemove = null;
    this.controller.removeProductArr(product);
    this.control.updatePagination();
  };

  private onAdd = (product: ProductView) => {
    if (product.Data === null) return;
    this.controller.addToProductDataModel(product.Data);
  };

  private onRemove = (product: ProductView) => {
    if (product.Data === null) return;
    this.controller.removeToProductDataModel(product.Data);
  };
}

export default ProductCartView;
