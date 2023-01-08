import PromoCode from '../components/PromoCode';

type obj = { [key: string]: { [key: string]: string } };

const promoCodes: obj = {
  rs: {
    code: 'rs',
    name: 'Rolling Scopes School',
  },
  dv: {
    code: 'dv',
    name: 'Devs',
  },
  lal: {
    code: 'lal',
    name: 'Lolka Altu Lutala',
  },
};

class TotalModel {
  private promoCodes: PromoCode[] = [];
  public searchPromoCode(val: string): PromoCode | null {
    const find = this.findPromoCodes(val);
    if (find === null) {
      return null;
    } else {
      const searchDuplicate = this.promoCodes.find((x) => x.ID === find.code);
      if (searchDuplicate) return null;
      const promo: PromoCode = new PromoCode(find.code, find.name, 20);
      this.promoCodes.push(promo);
      return promo;
    }
  }

  private findPromoCodes(value: string): { [key: string]: string } | null {
    if (promoCodes[value] === undefined) return null;
    return promoCodes[value];
  }

  // calc discount
  private price = 0;
  private discount = 0;
  public set Discount(discount: number) {
    this.discount = discount;
  }
  public get Discount() {
    return this.discount;
  }
  public set Price(price: number) {
    this.price = price;
  }

  public get NewPrice() {
    return this.calcNewPrice();
  }

  private calcNewPrice(): number {
    const price = this.price;
    const getProcent = (this.price / 100) * this.discount;
    const resultNewPrice = (price - getProcent).toFixed(2);
    return Number(resultNewPrice);
  }

  public matchPromoCode(id: string): void {
    const find = this.promoCodes.find((promo) => promo.ID === id);
    console.log(find);
    if (find) {
      this.discount += find.Discount;
    }
  }
}

export default TotalModel;
