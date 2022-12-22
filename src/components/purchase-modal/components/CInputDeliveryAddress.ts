import MaskDelivertAddress from '../common/MaskDeliveryAddress';
import Test from '../common/Test';
import '../style/с-input-style.scss';
import BaseComponent from './base/BaseComponent';

// TODO Rework
class CInputDeliveryAddress extends BaseComponent {
  private readonly id: string = 'delivery-address';
  private placeholder: string;

  private mask: MaskDelivertAddress = new MaskDelivertAddress();
  private test: Test = new Test();

  constructor(placeholder = 'placeholder') {
    super();
    this.placeholder = placeholder;
  }

  public init(): void {
    const input: HTMLInputElement | null = document.querySelector(`#${this.id}`);

    if (input !== null) {
      this.root = input;
      this.root.addEventListener('input', this.onInput);
      this.root.addEventListener('focus', this.onInputFocus);
      this.root.addEventListener('focusout', this.onInputFocusOut);
    }
  }

  public unmount(): void {
    this.root?.removeEventListener('input', this.onInput);
    this.root?.removeEventListener('focus', this.onInputFocus);
    this.root?.removeEventListener('focusout', this.onInputFocusOut);
  }

  public make(): string {
    const root = `
      <input id="${this.id}" class="input-modal" type="text" title="страна, город, улица, дом, кв" placeholder="${this.placeholder}">
    `;
    return root.trim();
  }

  private onInput = (event: Event) => {
    if (!(this.root instanceof HTMLInputElement)) return;
    if (!(event instanceof InputEvent)) return;
    if (event.inputType === 'deleteContentBackward') {
      // this.enumSwitchLastCharDelete();
      this.test.removeLastChar();
      this.root.value = this.test.Result;
    } else if (event.data === ' ') {
      // this.enumRaiseDown();
      // this.mask.enumDown();
      this.test.add(event.data);
      this.root.value = this.test.Result;
    } else {
      // this.addText(event.data);
      // const result = this.mask.getResult(event.data);
      // this.root.value = result;
      this.test.add(event.data);
      this.root.value = this.test.Result;
    }
  };

  private onInputFocus = () => {
    if (!(this.root instanceof HTMLInputElement)) return;
    if (this.root.value === '') {
      this.root.value = this.test.Result;
    }
  };

  private onInputFocusOut = () => {
    if (!(this.root instanceof HTMLInputElement)) return;
    this.root.value = '';
  };

  public checkValidity(): boolean {
    if (!(this.root instanceof HTMLInputElement)) return false;

    return true;
  }
}

export default CInputDeliveryAddress;
