import CInputDeliveryAddress from './components/CInputDeliveryAddress';
import CInputEmail from './components/CInputEmail';
import CInputPhone from './components/CInputPhone';
import CInputText from './components/CInputText';
import WCreditCard from './credit-card/WCreditCard';
import './style/purchase-modal.scss';

class WPurchaseModal {
  private root: HTMLElement | undefined;
  private isEnable = false;
  private isValidate = false;

  private inputs = {
    name: new CInputText('Name'),
    surname: new CInputText('Surname'),
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
    this.inputs.surname.init();
    this.inputs.phone.init();
    this.inputs.deliveryAddress.init();
    this.inputs.creditCard.init();
    this.inputs.email.init();
    const root: HTMLElement | null = document.querySelector('.purchase-modal');
    if (root !== null) {
      root.addEventListener('click', this.onModal);
      this.root = root;
    }
  }

  public unmount(): void {
    this.inputs.name.unmount();
    this.inputs.surname.unmount();
    this.inputs.phone.unmount();
    this.inputs.deliveryAddress.unmount();
    this.inputs.creditCard.unmount();
    this.inputs.email.unmount();
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
              ${this.inputs.surname.make()}
              ${this.inputs.phone.make()}
              ${this.inputs.deliveryAddress.make()}
              ${this.inputs.email.make()}
            </div>

            <div class="credit-card-details__purchase-modal">
              <span>Credit Card Details</span>
              ${this.inputs.creditCard.make()}
            </div>
            <button class="submit__purchase-modal">CONFIRM</button>
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
}

export default WPurchaseModal;
