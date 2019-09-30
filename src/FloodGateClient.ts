import { AutoUpdateConfig, IAutoUpdateConfig } from "./AutoUpdateConfig";
import { AutoUpdateService, IAutoUpdateService } from "./AutoUpdateService";
import { Evaluator } from "./Evaluator";
import * as Type from "./Types";

export interface IFloodGateClient {
  IsOn(key: string, defaultValue: boolean, callback: (value: any) => void, user?: Type.User): any;
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

  IsOn(_key: string, _defaultValue: boolean, callback: (value: any) => void, _user?: Type.User) {
    this.user = _user;

    this.service.getFlags((value) => {
      let result: boolean = _defaultValue;

      const evaluator = new Evaluator();
      result = evaluator.Evaluate(_key, value, _defaultValue, _user);

      // Return flag value to caller
      // true | false
      callback(result);
    });
  }

  GetValue(_key: string, _defaultValue: any, callback: (value: any) => void, _user?: Type.User) {
    this.user = _user;

    this.service.getFlags((value) => {
      const evaluator = new Evaluator();
      const result = evaluator.Evaluate(_key, value, _defaultValue, _user);

      // Return flag value to caller
      callback(result);
    });
  }
}