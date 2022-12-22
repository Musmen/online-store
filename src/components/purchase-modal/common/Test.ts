enum EAddress {
  COUNTRY,
  CITY,
  STREET,
  HOUSE,
  ROOM,
}

class Test {
  private temp = '';

  public get Result() {
    return this.temp;
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
    if (this.temp === this.currentData[0]) return;
    this.temp = this.temp.slice(0, -1);
    const arr = this.temp.split(' ');

    for (let i = 0; i < arr.length; i++) {
      console.log(this.currentData[0]);
      if (arr[i] === this.currentData[0]) {
        arr.splice(i, 1);
        this.enumUp();
        this.enumCurrentPosition();
        break;
      }
    }

    console.log(arr);
    console.log(arr.join(' '));
    const result = arr.join(' ');

    if (result.length <= 0) {
      console.log('shbfhbssfhbshbsfhb');
      this.temp = this.currentData[0];
      return;
    } else {
      this.temp = result;
    }
  }

  private nextAddress(): void {
    this.enumDown();
    this.enumCurrentPosition();
    if (this.temp.includes('room:')) return;
    this.temp += this.currentData[0];
  }

  // controll enum
  private enumCurrentPosition(): void {
    switch (this.enumAddress) {
      case EAddress.COUNTRY:
        console.log('Curr Pos: COUNTRY');
        this.currentData = this.data[0]; // country
        break;
      case EAddress.CITY:
        console.log('Curr Pos: CITY');
        this.currentData = this.data[1]; // city
        break;
      case EAddress.STREET:
        console.log('Curr Pos: STREET');
        this.currentData = this.data[2]; // street
        break;
      case EAddress.HOUSE:
        console.log('Curr Pos: HOUSE');
        this.currentData = this.data[3]; // house
        break;
      case EAddress.ROOM:
        console.log('Curr Pos: ROOM');
        this.currentData = this.data[4]; // room
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

export default Test;
