export interface ICommand {
  execute(): void;
}

export interface ICommandRender {
  execute(): string;
}
