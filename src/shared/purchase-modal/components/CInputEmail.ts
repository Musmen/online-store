import '../style/с-input-style.scss';
import BaseComponent from './base/BaseComponent';

class CInputEmail extends BaseComponent {
  private id = 'input-email';
  private placeholder: string;

  private isValidate = false;

  constructor(placeholder = 'pldaceholder') {
    super();
    this.placeholder = placeholder;
  }

  public init(): void {
    const input: HTMLInputElement | null = document.querySelector(`#${this.id}`);
    if (input !== null) {
      input.addEventListener('focusout', this.onInputFocusOut);
      this.root = input;
    }
  }

  public make(): string {
    const root = `
      <input id="${this.id}"
            class="input-modal"
            required type="email"
            placeholder="${this.placeholder}">
    `;
    return root.trim();
  }

  // public create(): HTMLInputElement {
  //   const root: HTMLInputElement = document.createElement('input');
  //   root.classList.add('input__personal-details');
  //   this.root = root;
  //   this.attributes();
  //   root.addEventListener('focusout', this.onInputFocusOut);
  //   return root;
  // }

  // protected attributes(): void {
  // this.root?.setAttribute('type', 'email');
  // this.root?.setAttribute('placeholder', this.placeholder);
  // this.root?.setAttribute('style', this.style());
  // }

  // protected style(): string {
  //   return `width: 100%`;
  // }

  private onInputFocusOut = () => {
    if (!(this.root instanceof HTMLInputElement)) return;
    this.validate(this.root.value);
  };

  private validate(val: string): void {
    this.isValidate = val.includes('@');
  }
}

export default CInputEmail;
