import { ICache, InMemoryCache } from "./Cache";
import { IConfigBase } from "./ConfigBase";
import { ApiService } from "./ApiService";
import * as Types from "./Types";
import * as Consts from "./Consts";

export abstract class ServiceBase {
  protected config: IConfigBase;
  protected cache: ICache;

  constructor(_config: IConfigBase) {
    this.config = _config;

    this.cache = new InMemoryCache();
    if (_config.cache)
      this.cache = _config.cache;
  }

  /**
   * Fetch environment data from the server
   * Check if the data has been modified and if not return from cache
   * @param callback 
   */
  public fetchRemote(callback: (value: any) => void): void {
    const requestHeaders: Types.KeyValue<string, string>[] = [
      {
        key: "Accept",
        value: "application/json"
      },
      {
        key: "Content-Type",
        value: "application/json"
      },
      {
        key: "FloodGate-SDK-Agent",
        value: `js-v${Consts.SDK_VERSION}`
      }
    ];

    const api = new ApiService().setHeaders(requestHeaders);
  
    const url = this.config.buildUrl();

    // Check to see if we have a current ETag
    let etag: string | null = this.cache.Get("ETag");
    if (etag) {
      api.setHeaders([{ key: "If-None-Match", value: `${etag}`}]);
    }

    api.get(url)
    .then((response) => {
      if (response.status == 304) { // read cache
        const json: any = this.cache.Get(this.config.sdkKey);
        callback(json);
        return;
      }

      const responseHeaders = response.headers;

      etag = responseHeaders.get("etag");
      if (typeof(etag) === "string") {
        etag = etag.replace(/['"]+/g, '');
      }
      
      this.cache.Set("ETag", etag);

      const json = response.parsedBody;

      if (this.validateJson(json)) {
        this.cache.Set(this.config.sdkKey, json);
        callback(json);
      }
    })
    .catch((error) => {
      // return cache if available
      const json: any = this.cache.Get(this.config.sdkKey);
      if (json) {
        callback(json);
      }
      
      throw error;
    });
    
    
  }

  private validateJson(json: string): boolean {
    return true;
  }
}