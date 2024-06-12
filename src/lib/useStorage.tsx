type StorageType = "session" | "local";

const isBrowser: boolean = typeof window !== "undefined";

const storageType = (type?: StorageType): "localStorage" | "sessionStorage" =>
  `${type ?? "local"}Storage`;

export const useStorage = {
  getItem: (key: string, type?: StorageType): string | null => {
    return isBrowser ? window[storageType(type)].getItem(key) : null;
  },

  setItem: (key: string, value: string, type?: StorageType): boolean => {
    if (isBrowser) {
      window[storageType(type)].setItem(key, value);
      return true;
    }
    return false;
  },

  removeItem: (key: string, type?: StorageType): void => {
    if (isBrowser) {
      window[storageType(type)].removeItem(key);
    }
  }
};
