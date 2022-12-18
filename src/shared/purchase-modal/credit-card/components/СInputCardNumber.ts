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
  }

  public init(): void {
    const input: HTMLInputElement | null = document.querySelector(`#${this.id}`);
    if (input !== null) {
      input.addEventListener('input', this.onInput);
      this.root = input;
    }
  }

  public make(): string {
    const root = `
      <input id="${this.id}"
              class="input__credit-card" 
              type="text" 
              required minlength="19" 
              required maxlength="19"
              title="Error"
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
}

export default CInputCardNumber;
