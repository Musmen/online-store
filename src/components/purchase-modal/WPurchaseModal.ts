import BaseComponent from './components/base/BaseComponent';
import CInputDeliveryAddress from './components/CInputDeliveryAddress';
import CInputEmail from './components/CInputEmail';
import CInputPhone from './components/CInputPhone';
import CInputText from './components/CInputText';
import WCreditCard from './credit-card/WCreditCard';
import './style/purchase-modal.scss';

class WPurchaseModal {
  private root: HTMLElement | undefined;
  private span: HTMLElement | undefined;

  private inputs = {
    name: new CInputText('Name Surname'),
    phone: new CInputPhone('Phone'),
    deliveryAddress: new CInputDeliveryAddress('Delivert address'),
    email: new CInputEmail('E-mail'),
    creditCard: new WCreditCard(),
  };

  constructor() {
    //
  }

  public init(): void {
    this.inputs.name.init();
    this.inputs.phone.init();
    this.inputs.deliveryAddress.init();
    this.inputs.email.init();
    this.inputs.creditCard.init();

    const root: HTMLElement | null = document.querySelector('.purchase-modal');
    const span: HTMLElement | null = document.querySelector('#form-message');
    if (root !== null && span !== null) {
      root.addEventListener('click', this.onModal);
      root.querySelector('.submit__purchase-modal')?.addEventListener('click', this.onSubmit);
      span.classList.add('message--disable');
      this.span = span;
      this.root = root;
    }
  }

  public unmount(): void {
    this.inputs.name.unmount();
    this.inputs.phone.unmount();
    this.inputs.deliveryAddress.unmount();
    this.inputs.email.unmount();
    this.inputs.creditCard.unmount();

    this.root?.removeEventListener('click', this.onModal);
  }

  public render(): string {
    const elem = `
      <div class="purchase-modal">
        <div class="modal__purchase-modal">
          <form>
            <div class="personal-details__purchase-modal">
              <span>Personal Detail</span>
              ${this.inputs.name.make()}
              ${this.inputs.phone.make()}
              ${this.inputs.deliveryAddress.make()}
              ${this.inputs.email.make()}
            </div>

            <div class="credit-card-details__purchase-modal">
              <span>Credit Card Details</span>
              ${this.inputs.creditCard.make()}
            </div>
            <button class="submit__purchase-modal" type="submit">CONFIRM</button>
            <span id="form-message" class="message__purchase-modal">sad</span>
          <form>
        </div>
      </div>
    `;
    return elem.trim();
  }

  private onModal = (event: Event) => {
    if (this.root === undefined) return;
    if (!(event.target instanceof Element)) return;
    // if (event.target.closest('.purchase-modal')) {
    if (event.target.className === 'purchase-modal') {
      this.root.style.display = 'none';
      this.unmount();
      console.log(event.target);
    }
  };

  private onSubmit = () => {
    if (this.span === undefined) return;

    const vals = Object.values(this.inputs);

    if (this.span.classList.contains('message--disable')) {
      this.span.classList.remove('message--disable');
    }

    if (this.isValidate(vals)) {
      this.span.textContent = 'SUCCESS: Please wait 3 seconds';
      setTimeout(() => {
        this.unmount();
        window.location.replace('?#/');
      }, 3000);
    } else {
      this.span.textContent = 'Invalide';
    }
  };

  private isValidate(arr: unknown[]): boolean {
    const temp = [];
    for (let i = 0; i < arr.length; i++) {
      const elem = arr[i];
      if (elem instanceof BaseComponent || elem instanceof WCreditCard) {
        temp.push(elem.checkValidity());
      }
    }

    return temp.every((a) => a === true);
  }
}

export default WPurchaseModal;