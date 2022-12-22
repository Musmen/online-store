enum EAddress {
  COUNTRY,
  CITY,
  STREET,
  HOUSE,
  ROOM,
  END,
}

class MaskDelivertAddress {
  private dataAddres = [
    ['country:', ''],
    ['city:', ''],
    ['street:', ''],
    ['house:', ''],
    ['room:', ''],
  ];
  private currentAddres: string[] = [];
  private enumAddress = EAddress.COUNTRY;
  private temp = '';
  constructor() {
    this.enumCurrentPosition();
  }

  public getResult(val: string | null): string {
    if (val === null) return '';
    this.enumCurrentPosition();
    this.changeAddress(val);
    const result = this.convertToReadable();
    console.log(this.dataAddres);
    this.temp = result;
    console.log(this.temp);
    return this.temp;
  }

  private changeAddress(val: string): void {
    this.currentAddres[1] += val;
  }

  public focus(): string {
    let result = '';

    for (let i = 0; i < this.dataAddres.length; i++) {
      const address = this.dataAddres[i];
      if (address[0].length !== 0) {
        result += address[0];
        break;
      }
    }

    return result;
  }

  private convertToReadable(): string {
    let result = '';

    for (let i = 0; i < this.dataAddres.length; i++) {
      const address = this.dataAddres[i];
      if (address[1].length !== 0) {
        result += address[0] + address[1];
      }
    }

    return result;
  }

  public removeLastChar(): void {
    switch (this.enumAddress) {
      case EAddress.COUNTRY:
        this.currentAddres[1] = this.currentAddres[1].slice(0, -1);
        this.convertToReadable();
        break;
      case EAddress.CITY:
        if (this.currentAddres[1].length <= 0) this.enumUp();
        this.currentAddres[1] = this.currentAddres[1].slice(0, -1);
        this.convertToReadable();
        break;
      case EAddress.STREET:
        if (this.currentAddres[1].length <= 0) this.enumUp();
        this.currentAddres[1] = this.currentAddres[1].slice(0, -1);
        this.convertToReadable();
        break;
      case EAddress.HOUSE:
        if (this.currentAddres[1].length <= 0) this.enumUp();
        this.currentAddres[1] = this.currentAddres[1].slice(0, -1);
        this.convertToReadable();
        break;
      case EAddress.ROOM:
        if (this.currentAddres[1].length <= 0) this.enumUp();
        this.currentAddres[1] = this.currentAddres[1].slice(0, -1);
        this.convertToReadable();
        break;
    }
  }

  private enumCurrentPosition(): void {
    switch (this.enumAddress) {
      case EAddress.COUNTRY:
        console.log('Curr Pos: COUNTRY');
        this.currentAddres = this.dataAddres[0]; // country
        break;
      case EAddress.CITY:
        console.log('Curr Pos: CITY');
        this.currentAddres = this.dataAddres[1]; // city
        break;
      case EAddress.STREET:
        console.log('Curr Pos: STREET');
        this.currentAddres = this.dataAddres[2]; // street
        break;
      case EAddress.HOUSE:
        console.log('Curr Pos: HOUSE');
        this.currentAddres = this.dataAddres[3]; // house
        break;
      case EAddress.ROOM:
        console.log('Curr Pos: ROOM');
        this.currentAddres = this.dataAddres[4]; // room
        break;
    }
  }

  public enumDown(): void {
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

export default MaskDelivertAddress;
