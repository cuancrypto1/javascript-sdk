import * as Cache from "./Cache";
import ILogger from "./ILogger";
import DefaultLogger from "./DefaultLogger";
import ConsoleLogger from "./ConsoleLogger";

export interface IConfigBase {
  sdkKey: string;
  baseUrl?: string;
  configUrl?: string;
  cache?: Cache.ICache;
  logger: ILogger;
  consoleLog: boolean;
  buildUrl(): string;
}

export abstract class ConfigBase implements IConfigBase {
  public sdkKey: string;

  public cache?: Cache.ICache;

  public logger: ILogger;

  public consoleLog: boolean = false;

  public readonly baseUrl: string = "https://cdn.floodgate.io";

  public configUrl: string = "";

  private readonly API_VERSION: string = "v1";

  constructor(_sdkKey: string, _options: IConfigBase) {
    if (!_sdkKey) {
      throw new Error("Invalid SDK Key");
    }

    this.sdkKey = _sdkKey;
    this.configUrl = this.baseUrl;
    this.logger = new DefaultLogger();
    
    if (_options) {
      if (!_options.cache) {
        // this.cache = new Cache.InMemoryCache();
        this.cache = new Cache.LocalStorageCache();
      }

      if (_options.consoleLog) {
        this.logger = new ConsoleLogger();
        this.logger.Log('Enabling console logging');
      }

      if (_options.configUrl) {
        this.configUrl = _options.configUrl;
      }
    }
  }

  public buildUrl(): string {
    const url = `${this.configUrl}/environment-files/${this.sdkKey}/${this.API_VERSION}/flags-config.json`;
    return url;
  }
}