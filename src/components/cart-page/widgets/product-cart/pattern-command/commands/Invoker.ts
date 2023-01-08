import { ICommand, ICommandRender } from '../interface/ICommand';

class Invoker {
  private command: ICommand | null = null;
  private commandRender: ICommandRender | null = null;

  public setCommand(com: ICommand): void {
    this.command = com;
  }

  public setCommandRender(com: ICommandRender): void {
    this.commandRender = com;
  }

  public execute(): void {
    this.command?.execute();
  }

  public executeRender(): string | null {
    if (this.commandRender === null) return null;
    return this.commandRender.execute();
  }
}

export default Invoker;
