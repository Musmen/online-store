abstract class BaseComponent {
  protected root: HTMLElement | HTMLInputElement | undefined;
  protected tempValue = '';
  protected errorText = 'Error';

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

  public checkValidity(): boolean {
    return false;
  }
}

export default BaseComponent;
