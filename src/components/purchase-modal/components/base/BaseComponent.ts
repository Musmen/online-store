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

  protected addClassStyleValidationError(): void {
    if (!(this.root instanceof HTMLInputElement)) return;
    this.root.classList.add('validation-error');
    this.root.value = this.errorText;
  }

  protected removeClassStyleValidationError(): void {
    if (!(this.root instanceof HTMLInputElement)) return;
    if (this.root.classList.contains('validation-error')) {
      this.root.classList.remove('validation-error');
      this.root.value = this.tempValue;
    }
  }
}

export default BaseComponent;
