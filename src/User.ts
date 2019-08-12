export interface IUser {
  Id: string;
  Email: string;
  CustomAttributes: { [key: string] : string; };
}

export class User {
  private id: string;
  private email?: string;
  private customAttributes?: { [key: string] : string; } = {};

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

  constructor(_id: string, _email?: string, _customAttributes?: { [key: string] : string; }) {
    this.id = _id;
    this.email = _email;
    this.customAttributes = _customAttributes
  }
}