import { LOCAL_STORAGE_KEYS } from './common/services.constants';

class LocalStorageService {
  public setLocalStorageData(value: unknown, key: string = LOCAL_STORAGE_KEYS.DEFAULT) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getFromLocalStorage(key: string = LOCAL_STORAGE_KEYS.DEFAULT) {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  public deleteFromLocalStorage(key: string = LOCAL_STORAGE_KEYS.DEFAULT) {
    localStorage.removeItem(key);
  }
}

export default new LocalStorageService();
