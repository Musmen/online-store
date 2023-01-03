import EventBus from '../../../eventbus/EventBus';
import EventCartEmpty from '../../../eventbus/events/EventCartEmpty';
import { ProductItem } from '../../../models/product-item.model';

class ProductStoreModel {
  private products: ProductItem[] = [];
  private links: string[] = [];
  private price = 0;
  private newPrice = 0;

  public get Products() {
    return this.products;
  }

  public get Links() {
    return this.links;
  }

  public get TotalAmount() {
    return this.products.length;
  }

  public get TotalPrice() {
    const reducer = (accum: number, currentValue: ProductItem) => accum + Number(currentValue.price);
    const result: number = this.products.reduce(reducer, 0);
    this.price = result;
    return result;
  }

  public set NewTotalPrice(price: number) {
    this.newPrice = price;
  }

  public get NewTotalPrice() {
    return this.newPrice;
  }

  public add(product: ProductItem, link = '#'): void {
    const find = this.products.find((x) => x.id === product.id);
    if (find) {
      const findDublicates = this.findDuplicates(find);
      if (findDublicates.length >= Number(product.amount)) {
        console.log(findDublicates);
        return;
      }
    }
    this.products.push(product);
    this.links.push(link);
    console.log(this.TotalPrice);
    EventBus.emit('price', this.price);
    EventBus.emit('counts', this.TotalAmount);
    EventBus.emit('price-and-counts', this.TotalPrice, this.TotalAmount);
  }

  public remove(product: ProductItem): void {
    for (let i = 0; i < this.products.length; i++) {
      const prod = this.products[i];
      if (prod === product) {
        console.log(prod === product);
        this.products.splice(i, 1);
        this.links.splice(i, 1);
        break;
      }
    }
    console.log(this.TotalPrice);
    console.log(this.TotalAmount);
    EventBus.emit('price', this.TotalPrice);
    EventBus.emit('counts', this.TotalAmount);
    EventBus.emit('price-and-counts', this.TotalPrice, this.TotalAmount);

    if (this.products.length <= 0) {
      EventCartEmpty.current.emit();
    }
  }

  private findDuplicates(product: ProductItem): ProductItem[] {
    const arr: ProductItem[] = [];
    for (let i = 0; i < this.products.length; i++) {
      const elem = this.products[i];
      if (elem.id === product.id) {
        arr.push(elem);
      }
    }

    return arr;
  }

  public reset(): void {
    this.products = [];
  }
}

export default new ProductStoreModel();
