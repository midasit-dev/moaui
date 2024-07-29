"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var half_1 = require("../../utils/half");
function toSolidRectangleVertices(props) {
    var b = props.b, h = props.h;
    var vertices = [];
    var lbb = { x: -(0, half_1.default)(b), y: (0, half_1.default)(h) };
    var rbb = { x: (0, half_1.default)(b), y: (0, half_1.default)(h) };
    var rbt = { x: (0, half_1.default)(b), y: -(0, half_1.default)(h) };
    var lbt = { x: -(0, half_1.default)(b), y: -(0, half_1.default)(h) };
    vertices.push([lbb, rbb, rbt, lbt]);
    return vertices;
}
exports.default = toSolidRectangleVertices;
