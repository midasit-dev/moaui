import ResponseType from "@lib-apis/declare/civilnx/db/types/returnType";

export default class ResponseBodyHelper<BodyType> {
  private raw: ResponseType<BodyType> = undefined;

  constructor(raw: ResponseType<BodyType>) {
    this.raw = raw;
  }

  public getValue(id: number | string): BodyType {
    return this.raw[String(id)];
  }
}
