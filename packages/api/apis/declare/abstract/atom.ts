import HttpRequest from "@lib-apis/declare/fetch/httpRequest";
import HttpRequestInit, {
  HttpRequestInitProps,
} from "@lib-apis/declare/fetch/httpRequestInit";
import ResponseBodyHelper from "@lib-apis/declare/civilnx/db/helper";

export default class Atom {
  public init: HttpRequestInit = undefined;

  constructor(init: HttpRequestInit) {
    this.init = init;
  }

  public getBaseUrl(): string {
    return this.init.getBaseUrl();
  }

  public getMapiKey(): string {
    return this.init.getMapiKey();
  }

  public getProductName(): string {
    return this.init.getProductName();
  }

  public getPath(): string {
    return this.init.path;
  }

  public getEndpoint(): string {
    return `${this.getBaseUrl()}/${this.getPath()}`;
  }

  public getHeaders(): HttpRequestInitProps["headers"] {
    return this.init.headers;
  }
}
