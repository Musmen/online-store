import QueryParamsService from '../../../../../../services/query-params.service';
import BaseView from '../../../../components/BaseView';
import ProductCartController from '../../controller/ProductCartController';
import ProductView from './ProductView';
class ControlView extends BaseView {
  private input: HTMLInputElement | null = null;
  private prev: HTMLElement | null = null;
  private span: HTMLElement | null = null;
  private textSpan = 1;
  private next: HTMLElement | null = null;
  private controller: ProductCartController;

  constructor(c: ProductCartController) {
    super();
    this.controller = c;
  }

  public init(): void {
    this.root = document.querySelector('#page-control');
    if (this.root === null) return;
    this.input = this.root.querySelector('.number-products__page-control');
    this.prev = this.root.querySelector('.prev__page-control');
    this.span = this.root.querySelector('.current-num__page-control');
    this.next = this.root.querySelector('.next__page-control');
    this.input?.addEventListener('input', this.onInput);
    this.prev?.addEventListener('click', this.onPrev);
    this.next?.addEventListener('click', this.onNext);

    this.amountProducts = Number(this.input?.value);
  }

  public unmount(): void {
    this.input?.removeEventListener('input', this.onInput);
    this.prev?.removeEventListener('click', this.onPrev);
    this.next?.removeEventListener('click', this.onNext);
  }

  public render(): string {
    const elem = `
    <div id="page-control" class="page-control__product-cart">
      <span>Products In Cart</span>
      <div class="items-control__product-cart">
        <span>Items:</span>
        <input class="number-products__page-control" type="text" placeholder="5"
                value="${this.amountProducts}">
      </div>
      <div class="pagination-control__product-cart">
        <span>Page:</span>
        <button class="prev__page-control"><</button>
        <span class="current-num__page-control">${this.amountChunk}</span>
        <button class="next__page-control">></button>
      </div>
    </div>`;
    return elem;
  }

  private tempProductsArr: ProductView[] = [];

  public setProducts(arr: ProductView[]): void {
    this.tempProductsArr = arr;

    const cart = QueryParamsService.getQueryParams();
    const test = Object.values(cart);

    if (!isNaN(Number(test[0])) && !isNaN(Number(test[1]))) {
      this.amountProducts = Number(test[0]);
      this.amountChunk = Number(test[1]);
    }

    if (this.input !== null) {
      this.input.value = String(this.amountProducts);
    }

    this.updatePagination();
  }

  private amountProducts = 5;

  private onInput = () => {
    if (this.input?.value === undefined) return;
    this.input.value = this.input?.value.replace(/[^\d]/g, '');
    if (Number(this.input?.value) === 0) {
      this.input.value = '1';
    }

    this.amountProducts = Number(this.input?.value);

    if (this.amountProducts <= 0) {
      this.input.value = '1';
    } else {
      this.input.value = String(this.amountProducts);
    }

    this.updatePagination();
  };

  private amountChunk = 1;

  private onPrev = () => {
    if (this.amountChunk <= 1) {
      this.amountChunk = 1;
    } else {
      this.amountChunk--;
    }

    this.updatePagination();
  };

  private onNext = () => {
    if (this.amountChunk >= this.maxCountPagination) {
      this.amountChunk = this.maxCountPagination;
    } else {
      this.amountChunk++;
    }
    this.updatePagination();
  };

  private maxCountPagination = 1;

  private chunkPagination: ProductView[][] = [];
  private calcPaginationCount(prod: ProductView[] = this.tempProductsArr): void {
    this.maxCountPagination = Math.ceil(prod.length / this.amountProducts);
    if (this.maxCountPagination <= 0) this.maxCountPagination = 1;
    this.chunkPagination = this.slicePaginations(prod, this.amountProducts);
  }

  private setSpanView(num: number): void {
    if (this.span === null) return;
    if (num <= 0) num = 1;
    this.textSpan = num;
    this.amountChunk = num;
    this.span.textContent = String(this.textSpan);
  }

  private slicePaginations(arr: ProductView[], size: number): ProductView[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      const chunk = arr.slice(i, i + size);
      result.push(chunk);
    }
    return result;
  }

  private showPagination(val: number): void {
    if (this.amountChunk >= this.chunkPagination.length) {
      this.amountChunk = this.chunkPagination.length;
      val = this.amountChunk;
    }

    for (let i = 0; i < this.chunkPagination.length; i++) {
      const elems = this.chunkPagination[i];
      elems.forEach((elem) => {
        if (elem.Root !== null) {
          elem.Root.style.display = i + 1 !== val ? 'none' : 'flex';
        }
      });
    }
  }

  public updatePagination(products: ProductView[] = this.tempProductsArr): void {
    QueryParamsService.setQueryParam('pag-items', String(this.amountProducts));
    QueryParamsService.setQueryParam('pag-page', String(this.amountChunk));

    this.calcPaginationCount(products);
    this.showPagination(this.amountChunk);
    this.setSpanView(this.amountChunk);
  }
}

export default ControlView;
