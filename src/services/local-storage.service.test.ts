import localStorageService from './local-storage.service';
import { LOCAL_STORAGE_KEYS } from './common/services.constants';
import { mockedLocalStorage } from '../test/mockedLocalStorage';

const originalStorage: Storage = global.localStorage;

describe('Testing local storage service from "src/services/local-storage.service.ts"', () => {
  beforeEach(() => {
    global.localStorage = mockedLocalStorage as Storage;
  });

  test('Correctly creates localStorageService instance with all methods', () => {
    expect(localStorageService).toBeDefined();
    expect(localStorageService.getFromLocalStorage).toBeDefined();
    expect(localStorageService.setLocalStorageData).toBeDefined();
    expect(localStorageService.deleteFromLocalStorage).toBeDefined();
  });

  describe('Testing setLocalStorageData and getLocalStorage methods', () => {
    test('Correctly set/get data to/from localStorage by default key name', () => {
      const testData = ['some data', 'another', 123];

      localStorageService.setLocalStorageData(testData);
      expect(mockedLocalStorage.getItem(LOCAL_STORAGE_KEYS.DEFAULT)).toBe(JSON.stringify(testData));
      expect(localStorageService.getFromLocalStorage()).toEqual(testData);
    });

    test('Correctly set/get data to/from localStorage by key name', () => {
      const testData = 'some data string 555';

      localStorageService.setLocalStorageData(testData, 'test');
      expect(mockedLocalStorage.getItem('test')).toBe(JSON.stringify(testData));
      expect(localStorageService.getFromLocalStorage('test')).toBe(testData);
    });
  });

  describe('Testing deleteFromLocalStorage method', () => {
    test('Correctly remove data from localStorage by default key name', () => {
      const testData = {
        property: ['some data object', 'with array'],
        another: { someKey: 'test string' },
      };

      localStorageService.setLocalStorageData(testData);
      expect(mockedLocalStorage.getItem(LOCAL_STORAGE_KEYS.DEFAULT)).toBe(JSON.stringify(testData));
      expect(localStorageService.getFromLocalStorage()).toEqual(testData);

      localStorageService.deleteFromLocalStorage();
      expect(mockedLocalStorage.getItem(LOCAL_STORAGE_KEYS.DEFAULT)).toBeFalsy();
      expect(localStorageService.getFromLocalStorage()).toEqual([]);
    });

    test('Correctly remove data from localStorage by key name', () => {
      const testData = { property: ['some data object', 'with array'] };

      localStorageService.setLocalStorageData(testData, 'test');
      expect(mockedLocalStorage.getItem('test')).toBe(JSON.stringify(testData));
      expect(localStorageService.getFromLocalStorage('test')).toEqual(testData);

      localStorageService.deleteFromLocalStorage('test');
      expect(mockedLocalStorage.getItem('test')).toBeFalsy();
      expect(localStorageService.getFromLocalStorage('test')).toEqual([]);
    });
  });

  afterEach(() => {
    global.localStorage = originalStorage;
  });
});
