import NodeElement from "@lib-apis/declare/civilnx/db/nodeElement";
import HttpRequestInit from "@lib-apis/declare/fetch/httpRequestInit";

export default class DB {
  public nodeElement: NodeElement = undefined;

  constructor(init: HttpRequestInit) {
    this.nodeElement = new NodeElement(init);
  }
}
