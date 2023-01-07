import storage from './storage/storage';
import appController from './controller/app.controller';
import router from './router/router';

class App {
  init(): void {
    storage.init();
    appController.init();
    router.init();
  }
}

export default new App();
