namespace Product {
  export type name = undefined | "CIVILNX" | "GENNX";
}

export interface InitProps {
  productName: Product.name;
  mapiKey: string; // abcdefg...
  baseUrl: string; // https://abc.com/civil
}

class Initializer {
  public productName: InitProps["productName"] = undefined;
  public mapiKey: InitProps["mapiKey"] = undefined;
  public baseUrl: InitProps["baseUrl"] = undefined;

  constructor(init: InitProps) {
    this.productName = init.productName;
    this.mapiKey = init.mapiKey;
    this.baseUrl = init.baseUrl;
  }
}

export default Initializer;
