import { ServiceBase } from "./ServiceBase";
import { IAutoUpdateConfig } from "./AutoUpdateConfig";

export interface IAutoUpdateService {
  GetFlags(callback: (value: any) => void): void;
}

export class AutoUpdateService extends ServiceBase implements IAutoUpdateService {
  private timer: number;

  constructor(_config: IAutoUpdateConfig) {
    super(_config);
    // @ts-ignore <ts(2322)>
    this.timer = setInterval(() => this.refreshConfig(), _config.refreshInterval * 1000);
  }

  private refreshConfig(): void {
    super.FetchRemote(() => {});
  }

  GetFlags(callback: (_value: any) => void): void {
    super.FetchRemote((_value) => {
      callback(_value);
    });
  }
}