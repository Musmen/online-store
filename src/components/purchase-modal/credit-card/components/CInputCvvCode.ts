import Common from '../../common/Common';
import BaseComponent from '../../components/base/BaseComponent';
import '../style/credit-card.scss';

class CInputCvvCode extends BaseComponent {
  private id = 'cvv-code';
  private placeholder: string;

  public get IsValidate() {
    if (!(this.root instanceof HTMLInputElement)) return;
    return this.root.checkValidity();
  }

  constructor(placeholder = 'placeholder') {
    super();
    this.placeholder = placeholder;
    this.errorText = '333';
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
      <input id="${this.id}"
            class="input__credit-card cvv-code__credit-card"
            type="text"
            title="Формат:234"
            minlength="3"
            maxlength="3"
            placeholder="${this.placeholder}">
    `;
    return root;
  }

  private temp = '';

  private onInput = (event: Event) => {
    if (!(this.root instanceof HTMLInputElement)) return;
    if (!(event instanceof InputEvent)) return;

    if (Common.isCharNumber(event.data)) {
      this.temp += event.data;
      this.root.value = this.temp;
    } else if (event.inputType === 'deleteContentBackward') {
      this.temp = this.temp.slice(0, -1);
      this.root.value = this.temp;
    } else {
      const remove = this.root.value.slice(0, -1);
      this.root.value = remove;
    }

    this.tempValue = this.root.value;
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

    const check = this.root.value;

    if (check.length < 3 || this.root.value === 'Error') {
      this.root.classList.add('validation-error');
      this.root.value = this.errorText;
      return false;
    }

    return true;
  }
}

export default CInputCvvCode;
