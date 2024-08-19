import HttpRequestInit from "@lib-apis/declare/fetch/httpRequestInit";

export default class HttpRequest<T extends HttpRequestInit> {
  private init: T = undefined;

  constructor(init: T) {
    this.init = init;
  }

  /**
   * @returns {Promise<any>} The response of the API.
   */
  public async get<U>(): Promise<U> {
    const init: T = this.init;

    const ep = init.getEndpoint();
    const headers = init.getHeaders();

    const response = await fetch(ep, {
      headers: headers,
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  }
}
