import storage from './components/storage/storage';
import appController from './components/controller/app.controller';

class App {
  async init(): Promise<void> {
    await storage.init();
    appController.init();
  }
}

export default new App();
