enum EAddress {
  COUNTRY,
  CITY,
  STREET,
  HOUSE,
  ROOM,
}

class TestDeliveryAddress {
  private temp = '';

  public get Result() {
    return this.temp;
  }

  public get ResultArr() {
    return this.temp.split(' ');
  }

  private data: string[][] = [
    ['country:', ''],
    ['city:', ''],
    ['street:', ''],
    ['house:', ''],
    ['room:', ''],
  ];
  private currentData: string[] = [];
  private enumAddress: EAddress = EAddress.COUNTRY;

  constructor() {
    this.init();
  }

  private init() {
    if (this.temp.length <= 0) this.temp = this.data[0][0];
  }

  public add(val: string | null): void {
    if (val === null) return;
    this.temp += val;
    if (val === ' ') this.nextAddress();
  }

  public removeLastChar(): void {
    if (this.temp === this.data[0][0]) return;
    if (this.temp === this.currentData[0]) return;

    if (this.temp.trim()[this.temp.length] === ':') return;
    this.temp = this.temp.slice(0, -1);
    const arr = this.temp.split(' ');

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === this.currentData[0]) {
        arr.splice(i, 1);
        this.enumUp();
        this.enumCurrentPosition();
        break;
      }
    }

    const result = arr.join(' ');

    if (result.length <= 0) {
      this.temp = this.currentData[0];
      return;
    } else {
      this.temp = result;
      if (this.temp === 'country:') {
        this.enumAddress = EAddress.COUNTRY;
      }
    }
  }

  private nextAddress(): void {
    if (this.checkChunkIsEmpty() === false) return;
    this.enumDown();
    this.enumCurrentPosition();
    if (this.temp.includes('room:')) return;
    this.temp += this.currentData[0];
  }

  private checkChunkIsEmpty(): boolean {
    if (
      this.temp[this.temp.length - 1] === ' ' &&
      typeof this.temp[this.temp.length - 2] === 'string' &&
      this.temp[this.temp.length - 2] !== ':'
    ) {
      return true;
    }
    return false;
  }

  // controll enum
  private enumCurrentPosition(): void {
    switch (this.enumAddress) {
      case EAddress.COUNTRY:
        this.currentData = this.data[0];
        break;
      case EAddress.CITY:
        this.currentData = this.data[1];
        break;
      case EAddress.STREET:
        this.currentData = this.data[2];
        break;
      case EAddress.HOUSE:
        this.currentData = this.data[3];
        break;
      case EAddress.ROOM:
        this.currentData = this.data[4];
        break;
    }
  }

  private enumDown(): void {
    switch (this.enumAddress) {
      case EAddress.COUNTRY:
        this.enumAddress = EAddress.CITY;
        break;
      case EAddress.CITY:
        this.enumAddress = EAddress.STREET;
        break;
      case EAddress.STREET:
        this.enumAddress = EAddress.HOUSE;
        break;
      case EAddress.HOUSE:
        this.enumAddress = EAddress.ROOM;
        break;
      case EAddress.ROOM:
        break;
    }
  }

  private enumUp(): void {
    switch (this.enumAddress) {
      case EAddress.ROOM:
        this.enumAddress = EAddress.HOUSE;
        break;
      case EAddress.HOUSE:
        this.enumAddress = EAddress.STREET;
        break;
      case EAddress.STREET:
        this.enumAddress = EAddress.CITY;
        break;
      case EAddress.CITY:
        this.enumAddress = EAddress.COUNTRY;
        break;
    }
  }
}

export default TestDeliveryAddress;
