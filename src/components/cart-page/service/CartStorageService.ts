class CartStorageService {
  public static add(value: unknown, key: string) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static getFrom(key: string) {
    return JSON.parse(localStorage.getItem(key) || '');
  }

  public static deleteFrom(key: string) {
    localStorage.removeItem(key);
  }
}

export default CartStorageService;
