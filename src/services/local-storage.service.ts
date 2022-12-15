import { LOCAL_STORAGE_KEYS } from './common/services.constants';

class LocalStorageService {
  #setLocalStorageData(value: unknown, key: string = LOCAL_STORAGE_KEYS.DEFAULT) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  #getFromLocalStorage(key: string = LOCAL_STORAGE_KEYS.DEFAULT) {
    return JSON.parse(localStorage.getItem(key) || '');
  }

  #deleteFromLocalStorage(key: string = LOCAL_STORAGE_KEYS.DEFAULT) {
    localStorage.removeItem(key);
  }
}

export default new LocalStorageService();
