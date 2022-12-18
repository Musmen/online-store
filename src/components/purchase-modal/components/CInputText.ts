import '../style/с-input-style.scss';
import BaseComponent from './base/BaseComponent';

class CInputText extends BaseComponent {
  private placeholder: string;

  constructor(placeholder = 'placeholder') {
    super();
    this.placeholder = placeholder;
  }

  public make(): string {
    const root = `
      <input class="input-modal" type="text" required minlength="3" title="не менее 3 символов" placeholder="${this.placeholder}">
    `;
    return root;
  }
}

export default CInputText;
