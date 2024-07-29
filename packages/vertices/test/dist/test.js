"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
function main() {
    var vertices = (0, _1.toVertices)({
        type: "HSection",
        properties: {
            h: 200,
            tw: 30,
            b1: 200,
            tf1: 50,
            b2: 200,
            tf2: 50,
            r1: 0,
            r2: 0,
        }
    });
    console.log(vertices);
}
main();
//# sourceMappingURL=test.js.map