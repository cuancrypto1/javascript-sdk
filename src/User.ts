export interface IUser {
  Id: string;
  Email: string | undefined;
  CustomAttributes: { [key: string] : string; } | undefined;
}

export class User {
  private id: string;
  private email?: string | undefined;
  private customAttributes?: { [key: string] : string; } = {};

  constructor(_id: string, _email?: string | undefined, _customAttributes?: { [key: string] : string; } | undefined) {
    if (_id === undefined || _id === null || _id === "" || typeof(_id) != "string") {
      throw new Error("User must be created with a unique id");
    }
    
    this.id = _id;
    this.email = _email;
    this.customAttributes = _customAttributes
  }

  get Id() {
    return this.id;
  }

  get Email() {
    return this.email;
  }

  set Email(value) {
    this.email = value;
  }

  get CustomAttributes() {
    return this.customAttributes;
  }
}