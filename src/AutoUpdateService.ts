import { ServiceBase } from "./ServiceBase";
import { IAutoUpdateConfig } from "./AutoUpdateConfig";

export interface IAutoUpdateService {
  getFlags(callback: (value: any) => void): void;
}

export class AutoUpdateService extends ServiceBase implements IAutoUpdateService {
  private timer: number;

  constructor(_config: IAutoUpdateConfig) {
    super(_config);
    this.timer = setInterval(() => this.refresh(), _config.refreshInterval * 1000);
  }

  refresh(): void {
    // ...
  }

  getFlags(callback: (_value: any) => void): void {
    super.fetchRemote((_value) => {
      callback(_value);
    });
  }
}