import AtomDB from "@lib-apis/declare/civilnx/db/atom";
import HttpRequestInit from "@lib-apis/declare/fetch/httpRequestInit";

export namespace Returns {
  export namespace Bodies {
    export interface Node {
      X: number;
      Y: number;
      Z: number;
    }

    export interface Elem {
      TYPE: string;
      MATL: number;
      SECT: number;
      NODE: number[];
      ANGLE: number;
      STYPE: number;
    }
  }
}

export default class NodeElement {
  public node: AtomDB<Returns.Bodies.Node> = undefined;
  public element: AtomDB<Returns.Bodies.Elem> = undefined;

  constructor(init: HttpRequestInit) {
    this.node = new AtomDB<Returns.Bodies.Node>(init, "NODE");
    this.element = new AtomDB<Returns.Bodies.Elem>(init, "ELEM");
  }
}
