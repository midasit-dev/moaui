namespace Product {
  export type name = undefined | "CIVILNX" | "GENNX";
}

export interface HttpRequestInitProps {
  baseUrl: string; // https://abc.com/civil
  mapiKey: string; // abcdefg...
  productName?: Product.name;
  headers?: { [key: string]: string }; // { "Content-Type": "application/json", "MAPI-Key": "abcdefg..." }
  path?: string; // db/node
}

export default class HttpRequestInit {
  public baseUrl: HttpRequestInitProps["baseUrl"] = undefined;
  public mapiKey: HttpRequestInitProps["mapiKey"] = undefined;
  public productName: HttpRequestInitProps["productName"] = undefined;
  public path: HttpRequestInitProps["path"] = undefined;
  public headers: HttpRequestInitProps["headers"] = undefined;

  constructor(init: HttpRequestInit | HttpRequestInitProps) {
    this.baseUrl = init.baseUrl ?? undefined;
    this.mapiKey = init.mapiKey ?? undefined;
    this.productName = init.productName ?? undefined;
    this.path = init.path ?? undefined;
    this.headers = init.headers ?? {
      "Content-Type": "application",
      "MAPI-Key": init.mapiKey ?? undefined,
    };
  }

  public reset(init: Partial<HttpRequestInitProps>): HttpRequestInit {
    this.baseUrl = init.baseUrl ?? this.baseUrl;
    this.mapiKey = init.mapiKey ?? this.mapiKey;
    this.productName = init.productName ?? this.productName;
    this.path = init.path ?? this.path;
    this.headers =
      {
        "Content-Type": "application",
        "MAPI-Key": init.mapiKey ?? this.mapiKey,
      } ?? this.headers;
    return this;
  }

  /**
   * @example https://moa-engineers.midasit.com:443/civil
   * @returns {string} The base URL of the product.
   */
  public getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * @returns {string} The mapiKey of the product.
   */
  public getMapiKey(): string {
    return this.mapiKey;
  }

  /**
   * @example CIVILNX
   * @returns {string} The name of the product.
   */
  public getProductName(): string {
    return this.productName;
  }

  /**
   * @example db/node
   * @returns {string} The raw name of the API.
   */
  public getPath(): string {
    return this.path;
  }

  /**
   * @example https://moa-engineers.midasit.com:443/civil/db/node
   * @returns {string} The endpoint of the API.
   */
  public getEndpoint(): string {
    return `${this.getBaseUrl()}/${this.path}`;
  }

  /**
   * @returns {Headers} The headers of the API.
   */
  public getHeaders(): HttpRequestInitProps["headers"] {
    return this.headers;
  }
}
