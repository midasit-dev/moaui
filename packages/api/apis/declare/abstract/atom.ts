import Initializer from "@lib-apis/declare/initializer";

abstract class AbstractAtom {
  constructor() {}

  abstract get(): void;
}

export default class Atom extends AbstractAtom {
  public init: Initializer = undefined;

  constructor(init: Initializer) {
    super();
    this.init = init;
  }

  public get() {
    console.error(
      "This is a placeholder function. Please override this function in the child class."
    );
    return;
  }
}
