abstract class BaseView {
  protected root: HTMLElement | null = null;
  public abstract init(): void;
  public abstract unmount(): void;
  public abstract render(): string;
}

export default BaseView;
