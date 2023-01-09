import { ProductItemData } from '../../../../../models/product-item.model';
import ControlComponent from './view/components/ControlComponent';
import ProductComponent from './view/components/ProductComponent';
import ProductCartView from './view/ProductCartView';

class NewProductCartController {
  private productCartView: ProductCartView = new ProductCartView();
  private controlComponent: ControlComponent = new ControlComponent();
  private productComponent: ProductComponent[] = [];

  public init(): void {
    this.productCartView.init();
    this.controlComponent.init();
    this.enable();
  }

  public unmount(): void {
    this.disable();
  }

  private enable(): void {
    this.controlComponent.Input?.addEventListener('input', this.onInput);
    this.controlComponent.Next?.addEventListener('click', this.onNext);
    this.controlComponent.Prev?.addEventListener('click', this.onPrev);
  }

  private disable(): void {
    this.controlComponent.Input?.removeEventListener('input', this.onInput);
    this.controlComponent.Next?.removeEventListener('click', this.onNext);
    this.controlComponent.Prev?.removeEventListener('click', this.onPrev);
  }

  public addProduct(item: ProductItemData): void {
    const prod = new ProductComponent(item);
    this.productCartView.addItem(prod.render());
    prod.init();
    this.productComponent.push(prod);
  }

  public render(): string {
    this.productCartView.bindControlComponent(this.controlComponent.render());
    return this.productCartView.render();
  }

  private onInput = () => {
    console.log('input');
  };

  private onNext = () => {
    console.log('input');
  };

  private onPrev = () => {
    console.log('input');
  };
}

export default NewProductCartController;
