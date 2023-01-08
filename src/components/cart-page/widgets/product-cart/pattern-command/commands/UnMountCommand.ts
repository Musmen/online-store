import { ICommand } from '../interface/ICommand';

class UnMountCommand implements ICommand {
  execute(): void {
    throw new Error('Method not implemented.');
  }
  //
}

export default UnMountCommand;
