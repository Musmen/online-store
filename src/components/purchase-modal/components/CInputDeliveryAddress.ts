import TestDeliveryAddress from '../common/TestDeliveryAddress';
import '../style/с-input-style.scss';
import BaseComponent from './base/BaseComponent';

class CInputDeliveryAddress extends BaseComponent {
  private readonly id: string = 'delivery-address';
  private placeholder: string;

  private test: TestDeliveryAddress = new TestDeliveryAddress();

  constructor(placeholder = 'placeholder') {
    super();
    this.placeholder = placeholder;
    this.errorText = 'Error: Format: Country, City, Street +';
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
      <input id="${this.id}" class="input-modal" type="text" title="at least three words, each at least 5 characters long" placeholder="${this.placeholder}">
    `;
    return root.trim();
  }

  private onInput = (event: Event) => {
    if (!(this.root instanceof HTMLInputElement)) return;
    if (!(event instanceof InputEvent)) return;

    if (event.inputType === 'deleteContentBackward') {
      this.test.removeLastChar();
      this.tempValue = this.test.Result;
      this.root.value = this.tempValue;
    } else if (event.data === ' ') {
      this.test.add(event.data);
      this.tempValue = this.test.Result;
      this.root.value = this.tempValue;
    } else {
      this.test.add(event.data);
      this.root.value = this.test.Result;
    }
  };

  private onInputFocus = () => {
    if (!(this.root instanceof HTMLInputElement)) return;
    if (this.root.value === '') {
      this.tempValue = this.test.Result;
      this.root.value = this.tempValue;
    }

    this.removeClassStyleValidationError();
  };

  private onInputFocusOut = () => {
    if (!(this.root instanceof HTMLInputElement)) return;
    if (this.tempValue === '' || this.tempValue === 'country:') this.root.value = '';
  };

  public checkValidity(): boolean {
    if (!(this.root instanceof HTMLInputElement)) return false;

    const arr = this.test.ResultArr;
    for (let i = 0; i < arr.length; i++) {
      const elem = arr[i].split(':');
      elem.shift();
      arr[i] = elem.join('');
    }

    if (arr.length < 3) {
      this.addClassStyleValidationError();
      return false;
    }

    const arrB: boolean[] = [];

    for (let i = 0; i < arr.length; i++) {
      const elem = arr[i];
      if (elem.length < 5) {
        arrB.push(false);
      } else {
        arrB.push(true);
      }
    }

    let sumB = 0;
    for (let i = 0; i < arrB.length; i++) {
      const elem = arrB[i];
      if (sumB > 3) break;
      if (elem === false) {
        sumB++;
      }
    }

    if (sumB > 0) {
      this.addClassStyleValidationError();
    }

    return true;
  }
}

export default CInputDeliveryAddress;
