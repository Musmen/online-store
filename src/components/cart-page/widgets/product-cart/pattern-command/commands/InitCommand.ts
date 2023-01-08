import { ICommand } from '../interface/ICommand';
import NewProductCartView from '../view/ProductCartView';

class InitCommand implements ICommand {
  private view: NewProductCartView;
  private root: HTMLElement | null = null;
  private containerItem: HTMLElement | null = null;
  // private control

  public constructor(view: NewProductCartView) {
    this.view = view;
  }

  execute(): void {
    this.root = document.querySelector('.product-cart');
    if (this.root === null) return;
    this.containerItem = this.root.querySelector('.container__product-cart');
    // this.control.init();
  }
  //
}

export default InitCommand;
