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

  constructor(placeholde = 'placeholder') {
    super();
    this.placeholder = placeholde;
  }

  public init(): void {
    const input: HTMLInputElement | null = document.querySelector(`#${this.id}`);
    if (input !== null) {
      input.addEventListener('input', this.onInput);
      this.root = input;
    }
  }

  public unmount(): void {
    this.root?.addEventListener('input', this.onInput);
  }

  public make(): string {
    const root = `
      <input id="${this.id}"
            class="input__credit-card cvv-code__credit-card"
            type="text"
            pattern="[0-9]{3}"
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
  };
}

export default CInputCvvCode;
