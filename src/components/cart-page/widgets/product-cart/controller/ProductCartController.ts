import { ProductItemData } from '../../../../../models/product-item.model';
import CartStoreService from '../../../models/CartStoreService';
import ProductView from '../view/components/ProductView';
import ProductCartView from '../view/ProductCartView';

class ProductCartController {
  private productView: ProductCartView = new ProductCartView(this);
  private productArr: ProductView[] = [];
  private dataProductModel = CartStoreService;

  public get ProductArr() {
    return this.productArr;
  }

  public init(): void {
    this.productView.init();
  }

  public unmount(): void {
    this.productView.unmount();
    this.productArr = [];
  }

  public render(): string {
    return this.productView.render();
  }

  public addProduct(product: ProductItemData): void {
    const findDublicate = this.findDublicate(product);
    if (findDublicate) {
      findDublicate.addCount();
    } else {
      const item = new ProductView(product, this.productArr.length + 1);
      this.productArr.push(item);
      this.productView.insert(item);
    }
  }

  public removeProductArr(product: ProductView): void {
    for (let i = 0; i < this.productArr.length; i++) {
      const item = this.productArr[i];
      if (product.ID === item.ID) {
        this.productArr.splice(i, 1);
        break;
      }
    }

    for (let i = 0; i < this.productArr.length; i++) {
      const item = this.productArr[i];
      item.Index = i + 1;
    }
  }

  public addToProductDataModel(product: ProductItemData): void {
    this.dataProductModel.add(product, product.link);
  }

  public removeToProductDataModel(product: ProductItemData): void {
    this.dataProductModel.remove(product);
  }

  private findDublicate(product: ProductItemData): ProductView | null {
    for (let i = 0; i < this.productArr.length; i++) {
      const item = this.productArr[i];
      if (Number(item.ID) === Number(product.id)) {
        return item;
      }
    }
    return null;
  }
}

export default ProductCartController;
