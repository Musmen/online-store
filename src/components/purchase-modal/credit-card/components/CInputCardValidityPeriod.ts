import Common from '../../common/Common';
import BaseComponent from '../../components/base/BaseComponent';
import MaskInput from '../common/MaskInput';

class CInputCardValidityPeriod extends BaseComponent {
  private id = 'validity-period';
  private placeholder: string;
  private maskInput: MaskInput = new MaskInput('__/__', '_', ['/']);

  constructor(placeholder = 'placeholder') {
    super();
    this.placeholder = placeholder;
    this.errorText = 'month/year';
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
              class="input__credit-card validity-period__credit-card" 
              type="text" 
              required minlength="5" 
              maxlength="5"
              placeholder="${this.placeholder}">
    `;
    return root.trim();
  }

  private onInput = (event: Event) => {
    if (!(this.root instanceof HTMLInputElement)) return;
    if (!(event instanceof InputEvent)) return;
    if (event.inputType === 'deleteContentBackward') {
      const result = this.maskInput.removeLastCharMask();
      this.root.value = result;
    } else if (Common.isCharNumber(event.data) && event.data !== null) {
      const result = this.maskInput.getResult(event.data);
      this.root.value = result;
    } else {
      const clear = this.root.value.split('');
      clear.pop();
      this.root.value = clear.join('');
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
    const check = this.root.value.split('/').join('');

    if (check.length <= 0 || check.length < 4) {
      this.root.classList.add('validation-error');
      this.root.value = this.errorText;
      return false;
    }

    return true;
  }
}

export default CInputCardValidityPeriod;
