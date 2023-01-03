import { ProductItem } from '../../../../../models/product-item.model';
import ProductStoreModel from '../../../models/ProductStoreModel';
import ProductView from '../view/components/ProductView';
import ProductCartView from '../view/ProductCartView';

class ProductCartController {
  private productView: ProductCartView = new ProductCartView(this);
  private productArr: ProductView[] = [];
  private dataProductModel = ProductStoreModel;

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

  public addProduct(product: ProductItem, link = '#'): void {
    const findDublicate = this.findDublicate(product);
    if (findDublicate) {
      findDublicate.addCount();
    } else {
      const item = new ProductView(product, this.productArr.length + 1, link);
      this.productView.insert(item);
      this.productArr.push(item);
    }
  }

  public removeProductArr(product: ProductView): void {
    for (let i = 0; i < this.productArr.length; i++) {
      const item = this.productArr[i];
      if (product.ID === item.ID) {
        this.productArr.splice(i, 1);
        return;
      }
    }
  }

  public addToProductDataModel(product: ProductItem): void {
    this.dataProductModel.add(product);
  }

  public removeToProductDataModel(product: ProductItem): void {
    this.dataProductModel.remove(product);
  }

  private findDublicate(product: ProductItem): ProductView | null {
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
