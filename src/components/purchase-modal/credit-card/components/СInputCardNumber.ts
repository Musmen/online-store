import Common from '../../common/Common';
import WCreditCard from '../WCreditCard';
import BaseComponent from '../../components/base/BaseComponent';

class CInputCardNumber extends BaseComponent {
  private readonly id = 'number-credit-cart';

  private creditCard: WCreditCard | null;

  private placeholder: string;

  constructor(placeholde = 'placeholder', creditCard: WCreditCard) {
    super();
    this.placeholder = placeholde;
    this.creditCard = creditCard;
    this.errorText = 'Error: Format: 0000 0000 0000 0000';
  }

  public init(): void {
    const input: HTMLInputElement | null = document.querySelector(`#${this.id}`);
    if (input !== null) {
      input.addEventListener('input', this.onInput);
      input.addEventListener('focus', this.onInputFocus);
      this.root = input;
    }
  }

  public unmount(): void {
    this.root?.removeEventListener('input', this.onInput);
    this.root?.removeEventListener('focus', this.onInputFocus);
  }

  public make(): string {
    const root = `
      <input id="${this.id}"
              class="input__credit-card" 
              type="text" 
              minlength="19" 
              maxlength="19"
              title="кол-во введенных цифр должно быть ровно 16"
              placeholder="${this.placeholder}">
    `;
    return root.trim();
  }

  private temp = '';

  private onInput = (event: Event) => {
    if (!(this.root instanceof HTMLInputElement)) return;
    if (!(event instanceof InputEvent)) return;

    if (event.inputType === 'deleteContentBackward') {
      this.remove();
    } else if (Common.isCharNumber(event.data)) {
      this.add(event.data);
      this.watchFirstNumber(this.temp[0]);
    } else {
      this.root.value = this.temp;
    }

    this.tempValue = this.root.value;
  };

  private add(val: string | null): void {
    if (val === null) return;
    if (!(this.root instanceof HTMLInputElement)) return;

    this.temp += val;
    const check = this.temp.replace(/\s/g, '');
    if (check.length % 4 === 0) {
      this.temp += ' ';
    }

    this.root.value = this.temp.trim();
  }

  private remove() {
    if (!(this.root instanceof HTMLInputElement)) return;
    this.temp = this.temp.trim().slice(0, -1);
    console.log(this.temp);
    this.root.value = this.temp;
  }

  private watchFirstNumber(val: string): void {
    this.creditCard?.getNum(val);
  }

  private onInputFocus = () => {
    if (!(this.root instanceof HTMLInputElement)) return;

    if (this.root.classList.contains('validation-error')) {
      this.root.classList.remove('validation-error');
      this.root.value = this.tempValue;
    }
  };

  public checkValidity(): boolean {
    if (!(this.root instanceof HTMLInputElement)) return false;
    const check = this.root.value.split(' ').join('');

    if (check.length !== 16) {
      this.root.classList.add('validation-error');
      this.root.value = this.errorText;
      return false;
    }

    return true;
  }
}

export default CInputCardNumber;
