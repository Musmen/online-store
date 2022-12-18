import Common from '../../common/Common';
import BaseComponent from '../../components/base/BaseComponent';

class CInputCardValidityPeriod extends BaseComponent {
  private id = 'validity-period';
  private placeholder: string;

  constructor(placeholder = 'placeholder') {
    super();
    this.placeholder = placeholder;
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
              class="input__credit-card validity-period__credit-card" 
              type="text" 
              required minlength="5" 
              maxlength="5"
              placeholder="${this.placeholder}">
    `;
    return root.trim();
  }

  private temp = '';

  private onInput = (event: Event) => {
    if (!(this.root instanceof HTMLInputElement)) return;
    if (!(event instanceof InputEvent)) return;
    if (event.inputType === 'deleteContentBackward') {
      this.temp = this.temp.slice(0, -1);
      this.root.value = this.temp;
    } else if (Common.isCharNumber(event.data)) {
      this.temp += event.data;
      this.patternMonthAndDay(this.temp);
      this.root.value = this.temp;
    } else {
      const clear = this.root.value.split('');
      clear.pop();
      this.root.value = clear.join('');
    }
  };

  private patternMonthAndDay(val: string | null): void {
    if (val === null) return;
    if (this.temp.length >= 4) {
      this.temp.split('');
      let result = this.temp[0];
      result += this.temp[1];
      result += '/';
      result += this.temp[2];
      result += this.temp[3];
      this.temp = result;
    }
  }
}

export default CInputCardValidityPeriod;
