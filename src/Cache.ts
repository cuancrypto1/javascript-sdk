export interface ICache {
  Get(key: string): string;

  Set(key: string, value: string | null): void;
}

export class InMemoryCache implements ICache {
  cache: { [key: string] : string; } = {};

  constructor() {
    
  }

  Get(key: string): string {
    return this.cache[key];
  }
  
  Set(key: string, value: string): void {
    this.cache[key] = value;
  }
}

export class LocalStoreCache implements ICache {
  Get(key: string): string {
    throw new Error("Method not implemented.");
  }
  
  Set(key: string, value: string | null): void {
    throw new Error("Method not implemented.");
  }
}