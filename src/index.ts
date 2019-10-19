import { FloodGateClient } from "./FloodGateClient";
import { AutoUpdateConfig, IAutoUpdateConfig } from "./AutoUpdateConfig";

export function createClient(_sdkKey: string) {
  let config: any = {
    sdkKey: _sdkKey,
    refreshInterval: 60
  };

  return createAutoUpdateClient(_sdkKey, config);
}

export function createAutoUpdateClient(_sdkKey: string, _config: IAutoUpdateConfig) {
  return new FloodGateClient(new AutoUpdateConfig(_sdkKey, _config));
}