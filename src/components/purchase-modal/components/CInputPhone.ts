import '../style/с-input-style.scss';
import BaseComponent from './base/BaseComponent';

class CInputPhone extends BaseComponent {
  private id = 'input-phone';
  private placeholder: string;

  private number = '';

  constructor(placeholder = 'placeholder') {
    super();
    this.placeholder = placeholder;
    this.number = '';
    this.errorText = 'Error: Format: +777777777';
  }

  public init(): void {
    const input: HTMLInputElement | null = document.querySelector(`#${this.id}`);
    if (input !== null) {
      input.addEventListener('input', this.onInputValue);
      input.addEventListener('focus', this.onInputFocus);
      input.addEventListener('focusout', this.onInputFocusOut);
      this.root = input;
    }
  }

  public unmount(): void {
    this.root?.removeEventListener('input', this.onInputValue);
    this.root?.removeEventListener('focus', this.onInputFocus);
    this.root?.removeEventListener('focusout', this.onInputFocusOut);
  }

  public make(): string {
    const root = `
      <input id="${this.id}"
            class="input-modal"
            type="tel"
            title="no shorter than 9 characters"
            minlength="10"
            placeholder="${this.placeholder}">
    `;
    return root.trim();
  }

  private onInputValue = (event: Event) => {
    if (!(this.root instanceof HTMLInputElement)) return;
    if (!(event instanceof InputEvent)) return;

    const check: number | string | null = Number(event.data) ? Number(event.data) : event.data;

    if (typeof check === 'number') {
      this.number += String(check);
      this.root.value = '+' + this.number;
    } else if (check === null) {
      const nArr: string[] = this.number.split('');
      nArr.pop();
      const result: string = nArr.join('');
      this.number = result;
      this.root.value = '+' + this.number;
    } else {
      this.root.value = '+' + this.number;
    }

    this.tempValue = this.root.value;
  };

  private onInputFocus = () => {
    if (this.root instanceof HTMLInputElement) {
      if (!this.root.value[0] || this.root.value === this.errorText) {
        this.root.value = '+';
      }

      if (this.root.classList.contains('validation-error')) {
        this.root.classList.remove('validation-error');
        if (!this.tempValue[0]) this.tempValue = '+';
        this.root.value = this.tempValue;
      }
    }
  };

  private onInputFocusOut = () => {
    if (!(this.root instanceof HTMLInputElement)) return;
    if (this.root.value === '+') this.root.value = '';
  };

  public checkValidity(): boolean {
    if (!(this.root instanceof HTMLInputElement)) return false;
    const check = this.root.value.split('+').join('');

    if (this.root.value === this.errorText) return false;
    if (check.length < 9) {
      this.root.classList.add('validation-error');
      this.root.value = this.errorText;
      return false;
    }

    return true;
  }
}

export default CInputPhone;
