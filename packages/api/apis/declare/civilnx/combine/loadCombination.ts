import Atom from "@lib-apis/declare/abstract/atom";
import HttpRequest from "@lib-apis/declare/fetch/httpRequest";
import HttpRequestInit from "@lib-apis/declare/fetch/httpRequestInit";

namespace Returns {
  export type Names = {
    [key: string]: string[];
  };
}

namespace Options {
  export interface Names {
    includeEmpty?: boolean;
  }
}

class Names extends Atom {
  constructor(init: HttpRequestInit) {
    super(init);
  }

  /**
   * @param option.includeEmpty include the empty data.
   * @returns
   */
  public async get(option?: Options.Names): Promise<Returns.Names> {
    const getNames = async (targetName: string): Promise<string[]> => {
      const httpRequest = new HttpRequest(
        new HttpRequestInit(this.init).reset({
          path: `db/${targetName}`,
        })
      );

      const data = await httpRequest.get<any>();
      const names: string[] = [];
      for (const key in data[targetName]) {
        names.push(data[targetName][key].NAME);
      }

      return names;
    };

    const allNames: Returns.Names = {};
    try {
      for (const category of [
        "LCOM-GEN",
        "LCOM-STEEL",
        "LCOM-CONC",
        "LCOM-SRC",
        "LCOM-STLCOMP",
        "LCOM-SEISMIC",
      ]) {
        const names = await getNames(category);
        if ((option && option.includeEmpty) || names.length > 0) {
          allNames[category] = await getNames(category);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      return allNames;
    }
  }
}

export default class LoadCombination {
  public names: Names = undefined;

  constructor(init: HttpRequestInit) {
    this.names = new Names(init);
  }
}
