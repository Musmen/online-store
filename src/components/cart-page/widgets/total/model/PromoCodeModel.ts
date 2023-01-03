import PromoCode from '../components/PromoCode';

type objCode = { [key: string]: { [key: string]: string } };

const promoCodes: objCode = {
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

class PromoCodeModel {
  private discount = 20;
  private promoCode: PromoCode | null = null;
  private promoCodeArr: PromoCode[] = [];
  public get Code() {
    return this.promoCode;
  }

  public set Search(code: string) {
    this.promoCode = this.searchPromoCode(code);
  }

  private searchPromoCode(val: string): PromoCode | null {
    const find = this.findPromoCodes(val);
    if (find === null) {
      return null;
    } else {
      const searchDuplicate = this.promoCodeArr.find((x) => x.ID === find.code);
      if (searchDuplicate) return searchDuplicate;
      const promo: PromoCode = new PromoCode(find.code, find.name, 20);
      this.promoCodeArr.push(promo);
      this.tempDiscount.push(promo.Discount);
      return promo;
    }
  }

  private findPromoCodes(value: string): { [key: string]: string } | null {
    if (promoCodes[value] === undefined) return null;
    return promoCodes[value];
  }

  private tempDiscount: number[] = [];
  private tempPrice = 0;
  public get Price() {
    return this.tempPrice;
  }
  public set Price(price: number) {
    this.tempPrice = price;
  }

  public calc(): void {
    if (this.tempDiscount.length <= 0) return;
    const result = this.tempDiscount.reduce((a, b) => a + b);
    const getProcent = (this.tempPrice / 100) * result;
    const newPrice = (this.tempPrice - getProcent).toFixed(2);
    this.tempPrice = Number(newPrice);
  }

  public removePromoCode(id: string): void {
    if (this.promoCodeArr.length <= 0) return;

    for (let i = 0; i < this.promoCodeArr.length; i++) {
      const promo = this.promoCodeArr[i];
      if (id === promo.ID) {
        this.tempDiscount.splice(i, 1);
        this.promoCodeArr.splice(i, 1);
        this.calc();
        return;
      }
    }
  }
}

export default PromoCodeModel;
