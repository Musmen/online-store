import BaseView from '../../../../../components/BaseView';

class ControlComponent extends BaseView {
  private input: HTMLInputElement | null = null;
  private prev: HTMLElement | null = null;
  private span: HTMLElement | null = null;
  private next: HTMLElement | null = null;

  public get Input() {
    return this.input;
  }

  public get Prev() {
    return this.prev;
  }

  public get Next() {
    return this.next;
  }

  public init(): void {
    this.root = document.querySelector('#page-control');
    if (this.root === null) return;
    this.input = this.root.querySelector('.number-products__page-control');
    this.prev = this.root.querySelector('.prev__page-control');
    this.span = this.root.querySelector('.current-num__page-control');
    this.next = this.root.querySelector('.next__page-control');
    // this.input?.addEventListener('input', this.onInput);
    // this.prev?.addEventListener('click', this.onPrev);
    // this.next?.addEventListener('click', this.onNext);

    // this.amountProducts = Number(this.input?.value);
  }

  public unmount(): void {
    // this.input?.removeEventListener('input', this.onInput);
    // this.prev?.removeEventListener('click', this.onPrev);
    // this.next?.removeEventListener('click', this.onNext);
  }

  private amountProducts = 5;
  private currentNumberPage = 1;

  public render(): string {
    const elem = `
    <div id="page-control" class="page-control__product-cart">
      <span>Products In Cart</span>
      <div class="items-control__product-cart">
        <span>Items:</span>
        <input class="number-products__page-control" type="text" placeholder="5" value="${this.amountProducts}">
      </div>
      <div class="pagination-control__product-cart">
        <span>Page:</span>
        <button class="prev__page-control"><</button>
        <span class="current-num__page-control">${this.currentNumberPage}</span>
        <button class="next__page-control">></button>
      </div>
    </div>`;
    return elem;
  }

  public bindAmountProduct(amount: number): void {
    this.amountProducts = amount;
  }

  public bindCurrentNumberPage(val: number): void {
    this.currentNumberPage = val;
  }

  // private tempProductsArr: ProductView[] = [];

  // public upd(): ProductView[] {
  // const tt = this.controller.ProductArr;
  // return tt;
  // }

  // public setProducts(arr: ProductView[]): void {
  //   this.tempProductsArr = arr;
  //   console.log(arr);
  //   console.log(arr.length);
  //   this.updatePagination(this.tempProductsArr);
  // }

  // private amountProducts = 5;

  // private onInput = () => {
  //   if (this.input?.value === undefined || this.input?.value === '') return;
  //   if (Number(this.input?.value) === 0) {
  //     this.input.value = '1';
  //   }

  //   this.amountProducts = Number(this.input?.value);

  //   if (this.amountProducts <= 0) {
  //     this.input.value = '1';
  //   } else {
  //     this.input.value = String(this.amountProducts);
  //   }

  //   // this.calcPaginationCount();
  //   // this.showPagination(this.amountChunk);
  //   this.updatePagination();
  // };

  // private amountChunk = 1;

  // private onPrev = () => {
  //   if (this.amountChunk <= 1) {
  //     this.amountChunk = 1;
  //   } else {
  //     this.amountChunk--;
  //   }

  //   // this.setSpanView(this.amountChunk);
  //   // this.showPagination(this.amountChunk);
  //   this.updatePagination();
  // };

  // private onNext = () => {
  //   if (this.amountChunk >= this.maxCountPagination) {
  //     this.amountChunk = this.maxCountPagination;
  //   } else {
  //     this.amountChunk++;
  //   }
  //   // this.setSpanView(this.amountChunk);
  //   // this.showPagination(this.amountChunk);
  //   this.updatePagination();
  // };

  // private maxCountPagination = 1;

  // private chunkPagination: ProductView[][] = [];
  // private calcPaginationCount(prod: ProductView[] = this.tempProductsArr): void {
  //   this.maxCountPagination = Math.ceil(prod.length / this.amountProducts);
  //   // this.maxCountPagination = Math.ceil(this.tempProductsArr.length / this.amountProducts);
  //   // this.chunkPagination = this.slicePaginations(this.tempProductsArr, this.amountProducts);
  //   this.chunkPagination = this.slicePaginations(prod, this.amountProducts);
  // }

  // private setSpanView(num: number): void {
  //   if (this.span === null) return;
  //   this.textSpan = num;
  //   this.span.textContent = String(this.textSpan);
  // }

  // private slicePaginations(arr: ProductView[], size: number): ProductView[][] {
  //   const result = [];
  //   for (let i = 0; i < arr.length; i += size) {
  //     const chunk = arr.slice(i, i + size);
  //     result.push(chunk);
  //   }
  //   return result;
  // }

  // private showPagination(val: number): void {
  //   if (this.chunkPagination.length <= this.amountChunk) {
  //     this.amountChunk = this.chunkPagination.length;
  //     val = this.amountChunk;
  //   }

  //   for (let i = 0; i < this.chunkPagination.length; i++) {
  //     const elems = this.chunkPagination[i];
  //     elems.forEach((elem) => {
  //       if (elem.Root !== null) {
  //         elem.Root.style.display = i + 1 !== val ? 'none' : 'flex';
  //       }
  //     });
  //   }
  // }

  // public updatePagination(prod: ProductView[] = this.tempProductsArr): void {
  //   this.calcPaginationCount();
  //   this.showPagination(this.amountChunk);
  //   this.setSpanView(this.amountChunk);
  // }
}

export default ControlComponent;
