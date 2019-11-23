import * as Types from "./Types";

interface IHttpResponse extends Response {
  parsedBody?: any;
}

export class ApiService {

  private _headers: string[][] = [];

  public setHeaders (headers: Types.KeyValue<string, string>[]): ApiService {
    for (const i in headers) {
      if (headers[i].hasOwnProperty('key')
        && headers[i].hasOwnProperty('value')) {
        
          this._headers.push([
            headers[i].key, 
            headers[i].value
          ]);
      }
    }
    return this;
  }

  public getHeaders() : string[][] {
    return this._headers;
  }

  get headers (): string[][] {
    return this._headers;
  }

  public resetHeaders (): void {
    this._headers = [];
  }

  public async get(url: string): Promise<IHttpResponse> {
    let response: IHttpResponse;

    return new Promise((resolve, reject) => {
      try {

        fetch(url, {
          // timeout: 10000,
          headers: this._headers
        })
        .then((res: Response) => {
          response = res;
          if (response.status === 200) {
            return res.json();
          }
          else if (response.status === 304) {
            return;
          }
          
          const error = new Error("Server response error");
          reject(error);
        })
        .then((body: IHttpResponse) => {
          response.parsedBody = body;
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });

      }
      catch (error) {
        reject(error);
      }
    });
  }
}