import Atom from "@lib-apis/declare/abstract/atom";
import Initializer from "@lib-apis/declare/initializer";

class SelfWeight extends Atom {
  constructor(init: Initializer) {
    super(init);
  }

  get(): void {
    console.log("Self weight is calculated.");
    console.log(this.init);
  }
}

class StaticLoads {
  public selfWeight: SelfWeight = undefined;

  constructor(init: Initializer) {
    this.selfWeight = new SelfWeight(init);
  }
}

export default class Load {
  public staticLoads: StaticLoads = undefined;

  constructor(init: Initializer) {
    this.staticLoads = new StaticLoads(init);
  }
}
