import TotalView from '../view/TotalView';

import CartStoreService from '../../../models/CartStoreService';
import PromoCodeModel from '../model/PromoCodeModel';

class TotalController {
  private view: TotalView = new TotalView(this);
  private promoCodeModel: PromoCodeModel = new PromoCodeModel();
  private productList = CartStoreService; // << Main Model

  public init(): void {
    this.view.init();
    this.view.Amount = this.productList.TotalAmount;
    this.view.Price = this.productList.TotalPrice;
  }

  public unmount(): void {
    this.view.unmount();
  }

  public render(): string {
    return this.view.render();
  }

  public setPriceAndCount(count: number, price: number) {
    this.view.Amount = count;
    this.view.Price = price;
    this.promoCodeModel.Price = this.productList.TotalPrice;
    this.promoCodeModel.calc();
    this.productList.NewTotalPrice = this.promoCodeModel.Price;
    this.view.updateNewPrice(this.productList.NewTotalPrice);
  }

  public searchPromoCode(val: string) {
    this.promoCodeModel.Search = val;
    if (this.promoCodeModel.Code === null) {
      this.view.removePromoCode();
    } else {
      this.view.setPromoCode(this.promoCodeModel.Code);
    }
  }

  public applyDiscount(): void {
    this.promoCodeModel.Price = this.productList.TotalPrice;
    this.promoCodeModel.calc();
    this.productList.NewTotalPrice = this.promoCodeModel.Price;
    this.view.updateNewPrice(this.productList.NewTotalPrice);
  }

  public dropDiscount(id: string): void {
    this.promoCodeModel.Price = this.productList.TotalPrice;
    this.promoCodeModel.removePromoCode(id);
    this.productList.NewTotalPrice = this.promoCodeModel.Price;
    this.view.updateNewPrice(this.productList.NewTotalPrice);
  }
}

export default TotalController;
