import Common from '../common/Common';
import '../style/с-input-style.scss';
import BaseComponent from './base/BaseComponent';

class CInputText extends BaseComponent {
  private id = 'input-name-surname';
  private placeholder: string;

  constructor(placeholder = 'placeholder') {
    super();
    this.placeholder = placeholder;
    this.errorText = 'Error: Format: Name Surname';
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
      <input id = "${this.id}" class="input-modal" type="text" required minlength="3" title="не менее двух слов, длина каждого не менее 3 символов" placeholder="${this.placeholder}">
    `;
    return root;
  }

  private onInput = (event: Event) => {
    if (!(this.root instanceof HTMLInputElement)) return;
    if (!(event instanceof InputEvent)) return;

    if (event.inputType === 'deleteContentBackward') {
      this.tempValue = this.tempValue.slice(0, -1);
    } else if (Common.isCharNumber(event.data)) {
      const clear = this.root.value.slice(0, -1);
      this.root.value = clear;
    } else {
      this.tempValue += event.data;
      this.root.value = this.tempValue;
    }
  };

  private onInputFocus = () => {
    if (!(this.root instanceof HTMLInputElement)) return;
    if (this.root.classList.contains('validation-error')) {
      this.root.classList.remove('validation-error');
      this.root.value = this.tempValue;
    }
  };

  public checkValidity(): boolean {
    if (!(this.root instanceof HTMLInputElement)) return false;

    const check = this.root.value.split(' ');

    for (let i = 0; i < check.length; i++) {
      if (check[i].length < 3 || check.length < 2) {
        this.root.classList.add('validation-error');
        this.root.value = this.errorText;
        return false;
      }
    }

    return true;
  }
}

export default CInputText;
