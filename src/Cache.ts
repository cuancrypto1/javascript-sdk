export interface ICache {
  Get(key: string): any;

  Set(key: string, value: any): void;
}

export class InMemoryCache implements ICache {
  CACHE_TIME_KEY: string = "floodgate_cache_time";

  refreshInterval: number = 120;

  cacheTime: number = 0;

  cache: { [key: string] : string; } = {};

  constructor() {
    
  }

  Get(key: string): any {
    return this.cache[key];
  }
  
  Set(key: string, value: string): void {
    this.cache[key] = value;
  }
}

export class LocalStorageCache implements ICache {
  Get(key: string): any {
    if (localStorage.getItem(key) !== null) {
      // @ts-ignore <ts(2322)>
      const value:string = localStorage.getItem(key);
      const result = JSON.parse(value);
      return result;
    }
    return;
  }
  
  Set(key: string, value: any): void {
    const encoded = JSON.stringify(value);
    localStorage.setItem(key, encoded);
  }
}