import EventPrice from './events/EventPrice';
type subType = { [key: string]: unknown };
type sub = { [key: string]: EventPrice };
class EventBus {
  private static readonly subscribers: subType[] = [];
  private static readonly subscriptions: sub = {};

  public static subscribe<T, U>(subClass: unknown, eventType: string, subFunc: (val: T, val2?: U) => void): void {
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

  public static emit<T, U>(eventType: string, val: T, val2?: U): void {
    for (let i = 0; i < this.subscribers.length; i++) {
      const sub = this.subscribers[i];
      if (sub.event === eventType) {
        if (sub.func instanceof Function) {
          sub.func(val, val2);
        }
      }
    }
  }
}

export default EventBus;
