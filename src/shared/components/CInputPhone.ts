import BaseComponent from './BaseComponent';

class CInputPhone extends BaseComponent {
  private placeholder: string;

  private number: string;

  constructor(placeholder = 'placeholder') {
    super();
    this.placeholder = placeholder;
    this.number = '';
  }

  public create(): HTMLInputElement | undefined {
    const root: HTMLInputElement = document.createElement('input');
    this.root = root;
    this.attributes();
    root.addEventListener('input', this.onInputValue);
    root.addEventListener('focus', this.onInputFocus);
    root.addEventListener('focusout', this.onInputEnd);
    return root;
  }

  protected attributes(): void {
    this.root?.setAttribute('type', 'tel');
    this.root?.setAttribute('minlength', '10');
    this.root?.setAttribute('placeholder', this.placeholder);
    this.root?.setAttribute('style', this.style());
  }

  protected style(): string {
    return `
    width: 100%;
    `;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
