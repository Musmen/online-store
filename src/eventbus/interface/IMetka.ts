// eslint-disable-next-line @typescript-eslint/no-empty-interface
export class IMetka {
  //
}

export interface ISubsccribe extends IMetka {
  subscribe(val: unknown): void;
}

export interface IEmite extends IMetka {
  emit(): void;
}
