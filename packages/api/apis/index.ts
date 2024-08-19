import DB from "@lib-apis/declare/civilnx/db";
import Combine from "@lib-apis/declare/civilnx/combine";
import HttpRequestInit, {
  HttpRequestInitProps,
} from "@lib-apis/declare/fetch/httpRequestInit";

/**
 * The main class that contains all the APIs.
 * @example
 * ```typescript
 * import API from "@midasit-dev/moaui-apis";
 * const api = new API({
 *   baseUrl: getBaseUrl(),
 *   mapiKey: getMapiKey(),
 * });
 *
 * const nodes = await api.db.nodeElement.node.get();
 * ...
 * ```
 */
export default class API {
  // default informations
  public init: HttpRequestInit = undefined;

  // apis
  public db: DB = undefined;
  public combine: Combine = undefined;

  constructor(init: HttpRequestInit | HttpRequestInitProps) {
    if (init instanceof HttpRequestInit) {
      this.init = init;
    } else if (init instanceof Object) {
      this.init = new HttpRequestInit(init);
    } else {
      throw new Error(
        "Please provide the initializer object or the instance of Initializer class."
      );
    }

    //initialize apis!
    this.db = new DB(this.init);
    this.combine = new Combine(this.init);
  }
}
