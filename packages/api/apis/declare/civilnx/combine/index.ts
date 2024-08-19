import LoadCombination from "@lib-apis/declare/civilnx/combine/loadCombination";
import HttpRequestInit from "@lib-apis/declare/fetch/httpRequestInit";

export default class Combine {
  public loadCombination: LoadCombination = undefined;

  constructor(init: HttpRequestInit) {
    this.loadCombination = new LoadCombination(init);
  }
}
