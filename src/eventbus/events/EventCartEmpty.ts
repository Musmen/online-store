import BaseEvent from './BaseEvent';

class EventCartEmpty extends BaseEvent {
  protected id = 'event-cart-empty';

  public static current: EventCartEmpty = new EventCartEmpty();

  protected constructor() {
    super();
  }

  public subscribe(callback: () => void): void {
    super.subscribe(callback);
  }

  public emit(): void {
    super.emit();
  }
}

export default EventCartEmpty;
