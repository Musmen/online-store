abstract class BaseComponent {
  protected root: HTMLElement | HTMLInputElement | undefined;

  get Root() {
    return this.root;
  }

  public create(): HTMLInputElement | undefined {
    return undefined;
  }

  protected attributes(): void {
    /* */
  }

  protected style(): string {
    return '';
  }
}

export default BaseComponent;
