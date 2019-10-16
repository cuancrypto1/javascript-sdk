import { AutoUpdateConfig, IAutoUpdateConfig } from "./AutoUpdateConfig";
import { AutoUpdateService, IAutoUpdateService } from "./AutoUpdateService";
import { Evaluator } from "./Evaluator";
import * as Type from "./Types";

export interface IFloodGateClient {
  GetValue(key: string, defaultValue: any, callback: (value: any) => void, user?: Type.User): any;
}

export class FloodGateClient implements IFloodGateClient {

  config: IAutoUpdateConfig;
  service: IAutoUpdateService;
  user?: Type.User;

  constructor(_config: IAutoUpdateConfig) {
    this.config = _config;

    if (_config && _config instanceof AutoUpdateConfig) {
      this.service = new AutoUpdateService(_config);
    }
    // additional services...

    else {
      throw new Error("Invalid service");
    }
  }

  GetValue(_key: string, _defaultValue: any, callback: (value: any) => void, _user?: Type.User) {
    this.user = _user;
    
    try {
      this.service.GetFlags((value) => {
        if (value) {
          const evaluator = new Evaluator();
          const result = evaluator.Evaluate(_key, value, _defaultValue, _user);

          // Return flag value to caller
          callback(result);
        }
        else {
          callback(_defaultValue);
        }
      });
    }
    catch (error) {
      callback(_defaultValue);
    }
  }
}