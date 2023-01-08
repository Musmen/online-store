import EventBus from '../../../eventbus/EventBus';
import EventCartEmpty from '../../../eventbus/events/EventCartEmpty';
import { ProductItem, ProductItemData } from '../../../models/product-item.model';
import LocalStorageService from '../../../services/local-storage.service';
import storage from '../../app/storage/storage';

class CartStoreService {
  private products: ProductItemData[] = [];
  private price = 0;
  private newPrice = 0;

  public get Products() {
    return this.products;
  }

  public get Links() {
    return this.products.filter((data) => data.link);
  }

  public get TotalAmount() {
    return this.products.length;
  }

  public get TotalPrice() {
    const reducer = (accum: number, currentValue: ProductItemData) => accum + Number(currentValue.price);
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

  public init(): void {
    this.reset();
    type obj = { [key: string]: string };
    const getArrID: obj[] = LocalStorageService.getFromLocalStorage('products-id');
    if (getArrID.length <= 0) return;
    for (let i = 0; i < getArrID.length; i++) {
      const elem = getArrID[i];
      const find = storage.getProducts().find((item) => Number(elem.id) === item.id);
      if (find !== undefined) {
        this.add(find, elem.link);
      }
    }
  }

  public add(product: ProductItem, link: string): void {
    const find = this.products.find((x) => x.id === product.id);
    if (find) {
      const findDublicates = this.findDuplicates(find);
      if (findDublicates.length >= Number(product.amount)) {
        return;
      }
    }
    const productData: ProductItemData = product as ProductItemData;
    productData.link = link;
    this.products.push(productData);
    EventBus.emit('price', this.TotalPrice);
    EventBus.emit('counts', this.TotalAmount);
    EventBus.emit('price-and-counts', this.TotalPrice, this.TotalAmount);

    const map = this.products.map((item) => {
      const ket = {
        id: String(item.id),
        link: item.link,
      };
      return ket;
    });
    LocalStorageService.setLocalStorageData(map, 'products-id');
  }

  public remove(product: ProductItemData): void {
    for (let i = 0; i < this.products.length; i++) {
      const prod = this.products[i];
      if (prod === product) {
        this.products.splice(i, 1);
        break;
      }
    }
    EventBus.emit('price', this.TotalPrice);
    EventBus.emit('counts', this.TotalAmount);
    EventBus.emit('price-and-counts', this.TotalPrice, this.TotalAmount);

    const idMap = this.products.map((item) => String(item.id));
    LocalStorageService.setLocalStorageData(idMap, 'products-id');
    if (this.products.length <= 0) {
      EventCartEmpty.current.emit();
    }
  }

  public removeAllProductsByID(id: number): void {
    const find = this.products.filter((prod) => prod.id === id);
    find.forEach((elem) => {
      const index = this.products.findIndex((i) => i.id === elem.id);
      this.products.splice(index, 1);
    });

    const map = this.products.map((item) => {
      const ket = {
        id: String(item.id),
        link: item.link,
      };
      return ket;
    });

    LocalStorageService.setLocalStorageData(map, 'products-id');
    EventBus.emit('price', this.TotalPrice);
    EventBus.emit('counts', this.TotalAmount);
    EventBus.emit('price-and-counts', this.TotalPrice, this.TotalAmount);
  }

  public isCheckProductByID(id: number): boolean {
    const find = this.products.find((prod) => prod.id === id);
    if (find) {
      return true;
    }
    return false;
  }

  private findDuplicates(product: ProductItemData): ProductItemData[] {
    const arr: ProductItemData[] = [];
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

  public cleanLocalStorage(): void {
    LocalStorageService.deleteFromLocalStorage('products-id');
    this.reset();
    EventBus.emit('price', this.TotalPrice);
    EventBus.emit('counts', this.TotalAmount);
    EventBus.emit('price-and-counts', this.TotalPrice, this.TotalAmount);
  }
}

export default new CartStoreService();
