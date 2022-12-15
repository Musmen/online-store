import BaseComponent from './BaseComponent';

class CInputEmail extends BaseComponent {
  private placeholder: string;

  private isValidate = false;

  constructor(placeholder = 'pldaceholder') {
    super();
    this.placeholder = placeholder;
  }

  public create(): HTMLInputElement | undefined {
    const root: HTMLInputElement = document.createElement('input');
    this.root = root;
    this.attributes();
    root.addEventListener('focusout', this.onInputFocusOut);
    return root;
  }

  protected attributes(): void {
    this.root?.setAttribute('type', 'email');
    this.root?.setAttribute('placeholder', this.placeholder);
    this.root?.setAttribute('style', this.style());
  }

  protected style(): string {
    return `width: 100%`;
  }

  private onInputFocusOut = () => {
    if (!(this.root instanceof HTMLInputElement)) return;
    this.validate(this.root.value);
  };

  private validate(val: string): void {
    this.isValidate = val.includes('@');
  }
}

export default CInputEmail;
