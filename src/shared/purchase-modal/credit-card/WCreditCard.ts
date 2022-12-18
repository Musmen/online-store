import './style/credit-card.scss';
import CInputCardNumber from './components/СInputCardNumber';
import CInputCardValidityPeriod from './components/CInputCardValidityPeriod';
import CInputCvvCode from './components/CInputCvvCode';

class WCreditCard {
  private root: HTMLElement | undefined;
  private isValidate = false;
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

  public make(): string {
    const root = `
      <div class="credit-card">
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
    const visa = `url("https://www.ttrweekly.com/site/wp-content/uploads/2019/11/VISA-logo.png")`;
    const masterCard = `url("https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/MasterCard_1979_logo.svg/1200px-MasterCard_1979_logo.svg.png")`;
    const chinaUnionPay = `url("https://mapolist.com/assets/img/pay-methods/unionpay-Mapolist.2419b78d44e1.png")`;
    if (num === 4) {
      // this.root.style.backgroundColor = `pink`;
      this.root.style.backgroundImage = visa;
    } else if (num === 5) {
      // this.root.style.backgroundColor = `green`;
      this.root.style.backgroundImage = masterCard;
    } else if (num === 6) {
      // this.root.style.backgroundColor = `black`;
      this.root.style.backgroundImage = chinaUnionPay;
    }
  }
}

export default WCreditCard;