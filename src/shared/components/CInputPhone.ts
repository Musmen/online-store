import BaseComponent from './BaseComponent';

class CInputPhone extends BaseComponent {
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
    this.root?.setAttribute('type', 'tel');
    this.root?.setAttribute('minlength', '10');
    this.root?.setAttribute('placeholder', this.style());
  }

  protected style(): string {
    return `
    width: 100%;
    `;
  }
}

export default CInputPhone;
