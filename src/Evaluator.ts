import * as Type from "./Types";
import * as Const from "./Consts";

export interface IEvaluator {
  Evaluate(_key:string, _json: any, _defaultValue: boolean, _user?: Type.User): boolean
}

export class Evaluator implements IEvaluator {
  public Evaluate(_key:string, _json: any, _defaultValue: boolean, _user?: Type.User): boolean {
    // @ts-ignore <ts(2339)>
    const values = Object.values(_json);

    for (const value of values) {

      if (value['key'] === _key) {

        if (!value['is_targeting_enabled']) {
          return value['state'];
        }

        if (_user) {
          return this.EvaluateTargets(value['targets'], _user, value['state']);
        }
        
        break;
      }
    }

    return _defaultValue;
  }

  private EvaluateTargets(_targets: any, _user: Type.User, _defaultValue: boolean): boolean {
    // @ts-ignore <ts(2339)>
    const targets = Object.values(_targets);

    let state = _defaultValue;
    let ruleResult: boolean = false;
    let evaluates: boolean = true;
    for (const target of targets) {
      state = target['state'];

      if (target['rules']) {
        ruleResult = this.EvaluateRules(target['rules'], _user);
        evaluates = evaluates && ruleResult;
      }
    }

    if (evaluates) {
      return state;
    }

    return _defaultValue;
  }

  private EvaluateRules(_rules: any, _user: Type.User): boolean {
    // @ts-ignore <ts(2339)>
    const rules = Object.values(_rules);

    let result: boolean = false;

    for (const rule of rules) {
      const userAttributeValue = this.GetUserAttributeValue(rule['attribute'], _user);
      if (!userAttributeValue) continue;
      
      const comparator = rule['comparator'];
      const values = rule['values'];

      switch (comparator) {
        case Const.COMPARATOR_EQUAL_TO:
          result = values.includes(userAttributeValue);
          break;
        case Const.COMPARATOR_NOT_EQUAL_TO:
            result = !values.includes(userAttributeValue);
          break;
        case Const.COMPARATOR_CONTAINS:
          for (const value of values) {
            result = userAttributeValue.includes(value);
            if (result) break;
          }
          break;
          case Const.COMPARATOR_NOT_CONTAIN:
            let valid = true;
            for (const value of values) {
              result = !userAttributeValue.includes(value);
              valid = result && valid;
            }

            result = valid;
            break;
        default:
          result = false;
          break;
      }
    }

    return result;
  }

  private GetUserAttributeValue(_key: string, _user: Type.User): string | null {
    if (_key.toLowerCase() === "email" ) {
      return _user.email;
    }

    if (_user.custom && _user.custom[_key.toLowerCase()].toLowerCase()) {
      return _user.custom[_key];
    }

    return null;
  }
}