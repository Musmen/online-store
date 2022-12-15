import BaseComponent from './BaseComponent';

class CInputText extends BaseComponent {
  private placeholder: string;

  constructor(placeholder = 'placeholder') {
    super();
    this.placeholder = placeholder;
  }

  public create(): HTMLInputElement | undefined {
    const root: HTMLInputElement = document.createElement('input');
    this.root = root;
    return root;
  }

  protected attributes(): void {
    this.root?.setAttribute('type', 'text');
    this.root?.setAttribute('minlength', '3');
    this.root?.setAttribute('placeholder', this.placeholder);
    this.root?.setAttribute('style', this.style());
  }

  protected style(): string {
    return `
      width: 100%;
      `;
  }
}

export default CInputText;
