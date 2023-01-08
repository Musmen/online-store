import { ICommandRender } from '../interface/ICommand';
import ControlComponent from '../view/components/ControlComponent';
import NewProductCartView from '../view/ProductCartView';

class RenderCommand implements ICommandRender {
  private view: NewProductCartView;
  private control: ControlComponent;

  public constructor(view: NewProductCartView, component: ControlComponent) {
    this.view = view;
    this.control = component;
  }

  execute(): string {
    return this.template();
  }

  // ${this.control.render()}
  private template(): string {
    const elem = `
      <div class="product-cart">
        ${this.control.render()}
        <div class="container__product-cart"></div>
      </div>
    `;
    return elem.trim();
  }
}

export default RenderCommand;
