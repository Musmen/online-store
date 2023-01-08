import NewEventBus from '../NewEventBus';
import { TType } from '../type/Type';

abstract class BaseEvent {
  protected id = 'base';
  private bus = NewEventBus;

  protected constructor() {
    //
  }
  public subscribe(callback: () => void): void;
  public subscribe<T extends TType>(callback: (data?: T) => void): void {
    this.bus.subscribe(this.id, callback);
  }

  public emit(): void;
  public emit<T extends TType>(data?: T): void {
    if (data === undefined) {
      this.bus.emit(this.id);
    } else {
      this.bus.emit(this.id, data);
    }
  }
}

export default BaseEvent;
