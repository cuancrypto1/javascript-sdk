import { ICache, InMemoryCache } from "./Cache";

export interface IConfigBase {
  sdkKey: string;
  baseUrl?: string;
  cache?: ICache;
  buildUrl(): string;
}

export abstract class ConfigBase implements IConfigBase {
  public sdkKey: string;

  public baseUrl: string = "https://cdn.floodgate.io";

  public cache?: ICache;

  private readonly API_VERSION: string = "v1";

  constructor(_sdkKey: string, _options: IConfigBase) {
    if (!_sdkKey)
      throw new Error("Invalid SDK Key");

    if (!_options.cache)
      this.cache = new InMemoryCache();

    if (_options) {
      if (_options.baseUrl) {
        this.baseUrl = _options.baseUrl;
      }
    }

    this.sdkKey = _sdkKey;
  }

  public buildUrl(): string {
    return `${this.baseUrl}/environment-files/${this.sdkKey}/${this.API_VERSION}/flags-config.json`;
  }
}