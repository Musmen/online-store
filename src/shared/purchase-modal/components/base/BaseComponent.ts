abstract class BaseComponent {
  protected root: HTMLElement | HTMLInputElement | undefined;

  public get Root() {
    return this.root;
  }

  public init(): void {
    //
  }

  public unmount(): void {
    //
  }

  public make(): string {
    return this.make();
  }
}

export default BaseComponent;
