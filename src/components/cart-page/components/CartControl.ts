import Product from './Product';

class CartControl {
  private root: HTMLElement | undefined;
  private input: HTMLInputElement | undefined;
  private prev: HTMLElement | undefined;
  private span: HTMLElement | undefined;
  private next: HTMLElement | undefined;

  public init(): void {
    const root: HTMLElement | null = document.querySelector('#page-control');
    if (root === null) return;
    const input: HTMLInputElement | null = root.querySelector('.number-products__page-control');
    const prevBtn: HTMLElement | null = root.querySelector('.prev__page-control');
    const span: HTMLElement | null = root.querySelector('.current-num__page-control');
    const nextBtn: HTMLElement = root.querySelector('.next__page-control') as HTMLElement;

    if (input !== null) {
      this.input = input;
      input?.addEventListener('input', this.onInput);
    }
    if (prevBtn !== null && nextBtn !== null) {
      prevBtn?.addEventListener('click', this.onPrev);
      nextBtn?.addEventListener('click', this.onNext);
      this.prev = prevBtn;
      this.next = nextBtn;
    }

    if (span !== null) {
      this.span = span;
    }
    this.root = root;
  }

  public unmount(): void {
    this.input?.removeEventListener('input', this.onInput);
    this.prev?.removeEventListener('click', this.onPrev);
    this.next?.removeEventListener('click', this.onNext);
  }

  public make(): string {
    const elem = `
    <div id="page-control" class="page-control__product-cart">
      <span>Products In Cart</span>
      <div class="items-control__product-cart">
        <span>Items:</span>
        <input class="number-products__page-control" type="text" placeholder="5" value="5">
      </div>
      <div class="pagination-control__product-cart">
        <span>Page:</span>
        <button class="prev__page-control"><</button>
        <span class="current-num__page-control">1</span>
        <button class="next__page-control">></button>
      </div>
    </div>`;
    return elem;
  }

  private products: Product[] = [];

  public setProducts(arr: Product[]): void {
    this.products = arr;
  }

  private showCountsProduct = 5;
  private onInput = () => {
    if (this.input?.value === undefined) return;
    this.showCountsProduct = Number(this.input?.value);

    if (this.showCountsProduct <= 0) {
      this.input.value = '1';
    } else {
      this.input.value = String(this.showCountsProduct);
    }

    this.calcPaginationCount();
    this.showPagination(this.spanValueView);
  };

  private spanValueView = 1;

  private onPrev = () => {
    if (this.spanValueView <= 1) {
      this.spanValueView = 1;
    } else {
      this.spanValueView--;
    }
    this.setSpanView(this.spanValueView);
    this.showPagination(this.spanValueView);
  };

  private onNext = () => {
    if (this.spanValueView >= this.maxCountPagination) {
      this.spanValueView = this.maxCountPagination;
    } else {
      this.spanValueView++;
    }
    this.setSpanView(this.spanValueView);
    this.showPagination(this.spanValueView);
  };

  private maxCountPagination = 1;

  private chunkPagination: Product[][] = [];
  private calcPaginationCount(): void {
    this.maxCountPagination = Math.ceil(this.products.length / this.showCountsProduct);
    this.chunkPagination = this.slicePaginations(this.products, this.showCountsProduct);
    console.log(this.chunkPagination);
  }

  private setSpanView(num: number): void {
    if (this.span === undefined) return;
    this.span.textContent = String(num);
  }

  private slicePaginations(arr: Product[], size: number): Product[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      const chunk = arr.slice(i, i + size);
      result.push(chunk);
    }
    return result;
  }

  private showPagination(val: number): void {
    for (let i = 0; i < this.chunkPagination.length; i++) {
      const elems = this.chunkPagination[i];
      if (i + 1 !== val) {
        elems.forEach((elem) => {
          if (elem.Root !== undefined) {
            elem.Root.style.display = 'none';
          }
        });
      } else {
        elems.forEach((elem) => {
          if (elem.Root !== undefined) {
            elem.Root.style.display = 'flex';
          }
        });
      }
    }
  }
}

export default CartControl;
