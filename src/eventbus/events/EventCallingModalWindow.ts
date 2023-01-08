import BaseEvent from './BaseEvent';

class EventCallingModalWindow extends BaseEvent {
  protected id = 'event-call-modal-window';

  public static current: EventCallingModalWindow = new EventCallingModalWindow();

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

export default EventCallingModalWindow;
