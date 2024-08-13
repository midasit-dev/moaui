import Initializer, { InitProps } from "@lib-apis/declare/initializer";
import Load from "@lib-apis/declare/civilnx/load";

export default class API {
  // default informations
  public init: Initializer = undefined;

  // apis
  public load: Load = undefined;

  constructor(init: Initializer | InitProps) {
    if (init instanceof Initializer) {
      this.init = init;
    } else if (init instanceof Object) {
      this.init = new Initializer(init);
    } else {
      throw new Error(
        "Please provide the initializer object or the instance of Initializer class."
      );
    }

    //initialize apis!
    this.load = new Load(init);
  }
}
