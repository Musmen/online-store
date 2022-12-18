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
  }

  public init(): void {
    const input: HTMLInputElement | null = document.querySelector(`#${this.id}`);
    if (input !== null) {
      input.addEventListener('input', this.onInputValue);
      input.addEventListener('focus', this.onInputFocus);
      input.addEventListener('focusout', this.onInputEnd);
      this.root = input;
    }
  }

  public unmount(): void {
    this.root?.removeEventListener('input', this.onInputValue);
    this.root?.removeEventListener('focus', this.onInputFocus);
    this.root?.removeEventListener('focusout', this.onInputEnd);
  }

  public make(): string {
    const root = `
      <input id="${this.id}"
            class="input-modal"
            type="tel"
            required minlength="10"
            placeholder="${this.placeholder}" required>
    `;
    return root.trim();
  }

  onInputValue = (event: Event) => {
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
  };

  onInputFocus = () => {
    if (this.root instanceof HTMLInputElement) {
      if (!this.root.value[0]) {
        this.root.value = '+';
      }
    }
  };

  onInputEnd = () => {
    if (!(this.root instanceof HTMLInputElement)) return;
    if (this.root.value === '+') this.root.value = '';
  };
}

export default CInputPhone;
