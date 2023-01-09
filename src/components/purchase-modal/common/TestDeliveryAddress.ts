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
  private dataValue = '';
  private enumAddress: EAddress = EAddress.COUNTRY;

  constructor() {
    this.init();
  }

  private init() {
    if (this.temp.length <= 0) this.temp = this.data[0][0];
  }

  public add(val: string | null): void {
    if (val === null) return;
    this.temp += val.trimStart();
    this.dataValue += val.trimStart();
    if (val === ' ') this.nextAddress();
  }

  public removeLastChar(): void {
    if (this.temp === this.data[0][0]) return;
    if (this.temp === this.currentData[0]) return;

    if (this.temp.trim()[this.temp.length - 1] === ':') return;
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
      this.enumAddress = EAddress.COUNTRY;
      this.enumCurrentPosition();
      return;
    } else {
      this.temp = result;
      if (this.temp === 'country:') {
        this.enumAddress = EAddress.COUNTRY;
        this.enumCurrentPosition();
      }
    }
  }

  private nextAddress(): void {
    this.currentData[1] = this.dataValue;
    if (this.checkChunkIsEmpty() === false) return;
    this.enumDown();
    this.enumCurrentPosition();
    if (this.temp.includes('room:')) return;
    this.temp += ' ' + this.currentData[0];
  }

  private checkChunkIsEmpty(): boolean {
    console.log(this.currentData);
    if (this.currentData[1] === undefined) return true;
    if (this.currentData[1].trim().length <= 0) return false;
    return true;
    // let str = this.temp;
    // if (str[str.length - 1] === ' ') str = str.slice(0, -1);
    // // console.log(str);
    // if (str[str.length - 1] === ' ' && str[str.length - 2] !== ':') {
    //   return true;
    // }
    // return true;
  }

  // controll enum
  private enumCurrentPosition(): void {
    switch (this.enumAddress) {
      case EAddress.COUNTRY:
        this.currentData = this.data[0];
        this.currentData[1] = this.dataValue; // new
        this.dataValue = ''; // new
        break;
      case EAddress.CITY: // new
        this.currentData = this.data[1];
        this.currentData[1] = this.dataValue; // new
        this.dataValue = ''; // new
        break;
      case EAddress.STREET:
        this.currentData = this.data[2];
        this.currentData[1] = this.dataValue; // new
        this.dataValue = ''; // new
        break;
      case EAddress.HOUSE:
        this.currentData = this.data[3];
        this.currentData[1] = this.dataValue; // new
        this.dataValue = ''; // new
        break;
      case EAddress.ROOM:
        this.currentData = this.data[4];
        this.currentData[1] = this.dataValue; // new
        this.dataValue = ''; // new
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
