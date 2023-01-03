import BaseEvent from './events/BaseEvent';
import { TType } from './type/Type';
type tt = { [key: string]: { id: string; callback: (data?: TType) => void } };
class NewEventBus {
  private subscribes: tt[] = [];

  public subscribe<T extends TType>(eventId: string, func: (data?: TType) => void): void {
    const lal: tt = {
      eventId: {
        id: eventId,
        callback: func,
      },
    };
    this.subscribes.push(lal);
  }

  public emit<T extends TType>(eventId: string, data?: T): void {
    for (let i = 0; i < this.subscribes.length; i++) {
      const elem = this.subscribes[i];
      if (elem.eventId.id === eventId) {
        elem.eventId.callback(data);
      }
    }
  }
}

export default new NewEventBus();
