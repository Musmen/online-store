class MaskInput {
  private mask = '__/__';
  private tempMask: string[] = [];
  private empty = '_';
  private separators: string[];
  private result = '';

  constructor(mask: string, empty: string, separators: string[]) {
    this.mask = mask;
    this.empty = empty;
    this.separators = separators;
    this.tempMask = mask.split('');
  }

  public getResult(val: string): string {
    this.changeTempMask(val);
    this.convertTempMaskToReadable();
    return this.result;
  }

  public removeLastCharMask(): string {
    const inversLen = this.tempMask.length - 1;

    for (let i = inversLen; i >= 0; i--) {
      const curr = this.tempMask[i];

      const checkForEmpty = curr !== this.empty;
      const checkForSeparator = !this.checkSeparators(this.tempMask[i]);

      if (checkForEmpty && checkForSeparator) {
        this.tempMask[i] = this.empty;
        break;
      }
    }

    this.convertTempMaskToReadable();
    return this.result;
  }

  // Hard Code
  private changeTempMask(val: string): void {
    const arr = this.tempMask;
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] === this.empty) {
        arr[i] = val;
        break;
      }
    }

    if (Number(arr[0] + arr[1]) >= 12) {
      arr[0] = '1';
      arr[1] = '2';
    }

    if (Number(arr[3] + arr[4]) >= 99) {
      arr[3] = '9';
      arr[4] = '9';
    }
  }

  // Hard Code
  private convertTempMaskToReadable(): void {
    const newArr: string[] = [];

    for (let i = 0; i < this.tempMask.length; i++) {
      if (this.tempMask[i] === this.empty) break;

      if (this.tempMask[i] !== this.empty) {
        newArr.push(this.tempMask[i]);
      } else if (this.checkSeparators(this.tempMask[i + 1])) {
        newArr.push(this.tempMask[i + 1]);
      }
    }

    this.result = newArr.join('');
  }

  private checkSeparators(elem: string): boolean {
    for (let i = 0; i < this.separators.length; i++) {
      if (elem === this.separators[i]) return true;
    }
    return false;
  }
}

export default MaskInput;
