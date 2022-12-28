import { IMetka } from './interface/IMetka';
type subType = { [key: string]: unknown };

class EventBus {
  private static readonly subscribers: subType[] = [];

  public static subscribe(subClass: IMetka, eventType: string, subFunc: (val: unknown) => void): void {
    // const check = this.checkImplementsClassInterface(subClass);
    // console.log(check);
    const obj: subType = {};
    obj['subClass'] = subClass;
    obj['event'] = eventType;
    obj['func'] = subFunc;
    this.subscribers.push(obj);
  }

  public static unSubscribe(): void {
    //
  }

  public static emit(eventType: string, val: unknown): void {
    for (let i = 0; i < this.subscribers.length; i++) {
      const sub = this.subscribers[i];
      if (sub.event === eventType) {
        if (sub.func instanceof Function) {
          sub.func(val);
        }
      }
    }
  }

  private static call(): void {
    //
  }

  private static checkImplementsClassInterface(subClass: IMetka): subClass is IMetka {
    return 'ISubscribe' in subClass;
  }
}

export default EventBus;
