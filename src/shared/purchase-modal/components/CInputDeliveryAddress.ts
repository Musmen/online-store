import '../style/с-input-style.scss';
import BaseComponent from './base/BaseComponent';

enum DAddress {
  COUNTRY,
  CITY,
  STREET,
  HOUSE,
  ROOM,
  END,
}

class CInputDeliveryAddress extends BaseComponent {
  private readonly id: string = 'delivery-address';
  private placeholder: string;

  constructor(placeholder = 'placeholder') {
    super();
    this.placeholder = placeholder;

    this.country = 'страна:';
    this.city = 'город:';
    this.street = 'улица:';
    this.house = 'дом:';
    this.room = 'квартира:';
  }

  public init(): void {
    const input: HTMLInputElement | null = document.querySelector(`#${this.id}`);

    if (input !== null) {
      this.root = input;
      this.root.addEventListener('input', this.onInput);
      this.root.addEventListener('focus', this.onInputFocus);
      this.root.addEventListener('focusout', this.onInputFocusOut);
    }
  }

  public unmount(): void {
    this.root?.removeEventListener('input', this.onInput);
    this.root?.removeEventListener('focus', this.onInputFocus);
    this.root?.removeEventListener('focusout', this.onInputFocusOut);
  }

  public make(): string {
    const root = `
      <input id="${this.id}" class="input-modal" type="text" title="страна, город, улица, дом, кв" placeholder="${this.placeholder}">
    `;
    return root.trim();
  }
  // public create(): HTMLInputElement {
  //   const root: HTMLInputElement = document.createElement('input');
  //   root.classList.add('input__personal-details');
  //   this.root = root;
  //   this.attributes();
  //   root.addEventListener('input', this.onInput);
  //   root.addEventListener('focus', this.onInputFocus);
  //   root.addEventListener('focusout', this.onInputFocusOut);
  //   return root;
  // }

  // protected attributes(): void {
  //   this.root?.setAttribute('type', 'text');
  //   this.root?.setAttribute('type', 'text');
  //   this.root?.setAttribute('placeholder', this.placeholder);
  // this.root?.setAttribute('style', this.style());
  // }

  // protected style(): string {
  //   return `width: 100%`;
  // }

  private country: string;

  private city: string;

  private street: string;

  private house: string;

  private room: string;

  private da: DAddress = DAddress.COUNTRY;

  private onInput = (event: Event) => {
    if (!(this.root instanceof HTMLInputElement)) return;
    if (!(event instanceof InputEvent)) return;

    if (event.data === ' ') {
      if (this.da === DAddress.END) return;

      switch (this.da) {
        case DAddress.CITY:
          this.root.value += this.city;
          this.da = DAddress.STREET;
          break;
        case DAddress.STREET:
          this.root.value += this.street;
          this.da = DAddress.HOUSE;
          break;
        case DAddress.HOUSE:
          this.root.value += this.house;
          this.da = DAddress.ROOM;
          break;
        case DAddress.ROOM:
          this.root.value += this.room;
          this.da = DAddress.END;
          break;
      }
    }
  };

  private onInputFocus = () => {
    if (!(this.root instanceof HTMLInputElement)) return;
    this.root.value = this.country;
    this.da = DAddress.CITY;
  };

  private onInputFocusOut = () => {
    if (!(this.root instanceof HTMLInputElement)) return;
    if (this.root.value === this.country) this.root.value = '';
    this.da = DAddress.COUNTRY;
  };
}

export default CInputDeliveryAddress;
