import './style/credit-card.scss';
import CInputCardNumber from './components/СInputCardNumber';
import CInputCardValidityPeriod from './components/CInputCardValidityPeriod';
import CInputCvvCode from './components/CInputCvvCode';
import BaseComponent from '../components/base/BaseComponent';

class WCreditCard {
  private root: HTMLElement | undefined;
  private inputs = {
    cardNumber: new CInputCardNumber('Card Number', this),
    cardVP: new CInputCardValidityPeriod('Validity Period'),
    cardCvvCode: new CInputCvvCode('CVV'),
  };

  public init(): void {
    this.inputs.cardNumber.init();
    this.inputs.cardVP.init();
    this.inputs.cardCvvCode.init();
    const creditCard: HTMLElement | null = document.querySelector('.credit-card');
    if (creditCard !== null) {
      this.root = creditCard;
    }
  }

  public unmount(): void {
    this.inputs.cardNumber.unmount();
    this.inputs.cardVP.unmount();
    this.inputs.cardCvvCode.unmount();
  }

  public make(): string {
    const root = `
      <div class="credit-card blank-card">
          ${this.inputs.cardNumber.make()}

          <div>
            ${this.inputs.cardVP.make()}
            ${this.inputs.cardCvvCode.make()}
          </div>
      </div>
    `;
    return root.trim();
  }

  public getNum(val: string): void {
    if (this.root === undefined) return;
    const num = Number(val);
    if (typeof num !== 'number') return;
    const blank = 'blank-card';
    const visa = 'visa';
    const masterCard = 'master-card';
    const chinaUnionPay = 'unionpay';
    if (num === 4) {
      this.switchImageCreditCard(visa);
    } else if (num === 5) {
      this.switchImageCreditCard(masterCard);
    } else if (num === 6) {
      this.switchImageCreditCard(chinaUnionPay);
    } else {
      this.switchImageCreditCard(blank);
    }
  }

  private switchImageCreditCard(img: string): void {
    if (this.root === undefined) return;
    if (this.root.classList[1] === undefined) {
      this.root.classList.add(img);
    } else {
      this.root.classList.remove(this.root.classList[1]);
      this.root.classList.add(img);
    }
  }

  public checkValidity(): boolean {
    const vals = Object.values(this.inputs);

    if (this.isValidate(vals)) {
      return true;
    } else {
      return false;
    }
  }

  private isValidate(arr: unknown[]): boolean {
    const temp = [];
    for (let i = 0; i < arr.length; i++) {
      const elem = arr[i];
      if (elem instanceof BaseComponent) {
        temp.push(elem.checkValidity());
      }
    }

    return temp.every((a) => a === true);
  }
}

export default WCreditCard;
