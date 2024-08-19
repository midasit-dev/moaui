import Atom from "@lib-apis/declare/abstract/atom";
import HttpRequest from "@lib-apis/declare/fetch/httpRequest";
import HttpRequestInit from "@lib-apis/declare/fetch/httpRequestInit";
import ResponseBodyHelper from "@lib-apis/declare/civilnx/db/helper";
import ResponseType from "@lib-apis/declare/civilnx/db/types/returnType";

export default class AtomDB<BodyType> extends Atom {
  public dbName: string = undefined;

  constructor(init: HttpRequestInit, dbName: string) {
    super(new HttpRequestInit(init).reset({ path: `db/${dbName}` }));
    this.dbName = dbName;
  }

  /**
   * @returns A promise that resolves to the raw data.
   * @example
   * ```json
   * {
   *   "1": { X: 0, Y: 0, Z: 0 },
   *   "2": { X: 1, Y: 0, Z: 0 },
   *   ...
   * }
   * ```
   */
  public async getRaw(): Promise<ResponseType<BodyType>> {
    const data = await new HttpRequest(this.init).get();
    return data[this.dbName];
  }

  /**
   * Retrieves a ResponseBodyHelper instance.
   * @returns A promise that resolves to a ResponseBodyHelper instance.
   * @example
   * ```typescript
   * const helperNode = await api.db.nodeElement.node.get();
   * const Node1 = helperNode.getValue(1);
   * console.log(Node1.X, Node1.Y, Node1.Z);
   * ```
   */
  public async get(): Promise<ResponseBodyHelper<BodyType>> {
    const raw = await this.getRaw();
    return new ResponseBodyHelper<BodyType>(raw);
  }
}
