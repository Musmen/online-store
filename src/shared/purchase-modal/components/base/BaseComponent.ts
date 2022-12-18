abstract class BaseComponent {
  protected root: HTMLElement | HTMLInputElement | undefined;

  public get Root() {
    return this.root;
  }

  public init(): void {
    //
  }

  public create(): HTMLInputElement {
    return this.create();
  }

  public make(): string {
    return this.make();
  }

  protected attributes(): void {
    /* */
  }

  protected style(): string {
    return '';
  }
}

export default BaseComponent;
