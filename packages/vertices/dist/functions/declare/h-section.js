"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var half_1 = require("../../utils/half");
function toHSectionVertices(props) {
    var h = props.h, tw = props.tw, b1 = props.b1, tf1 = props.tf1, b2 = props.b2, tf2 = props.tf2, r1 = props.r1, r2 = props.r2;
    var vertices = [];
    //기본 각 꼭지점 좌표 계산
    var flangeW1 = (b1 - tw) * 0.5; // Top flange Wing width (1/2)
    var webH = h - tf1 - tf2; // Web height
    var flangeW2 = (b2 - tw) * 0.5; // Bottom flange Wing width (1/2)
    /*
     *  ltt                         rtt
     *   |---------------------------|
     *   |---------------------------|
     *  ltb    clt|         |crt    rtb
     *            |				 |
     *            |				 |
     *            |				 |
     *  lbt    clb|         |crb    rbt
     *   |---------------------------|
     *   |---------------------------|
     *  lbb                         rbb
     */
    var lbb = { x: -(0, half_1.default)(b2), y: (0, half_1.default)(h) };
    var rbb = { x: (0, half_1.default)(b2), y: (0, half_1.default)(h) };
    var rbt = { x: (0, half_1.default)(b2), y: (0, half_1.default)(h) - tf2 };
    var crb = { x: (0, half_1.default)(b2) - flangeW2, y: (0, half_1.default)(h) - tf2 };
    var crt = { x: (0, half_1.default)(b2) - flangeW2, y: (0, half_1.default)(h) - tf2 - webH };
    var rtb = { x: (0, half_1.default)(b1), y: (0, half_1.default)(h) - tf2 - webH };
    var rtt = { x: (0, half_1.default)(b1), y: (0, half_1.default)(h) - tf2 - webH - tf1 };
    var ltt = { x: -(0, half_1.default)(b1), y: (0, half_1.default)(h) - tf2 - webH - tf1 };
    var ltb = { x: -(0, half_1.default)(b1), y: (0, half_1.default)(h) - tf2 - webH };
    var clt = { x: -(0, half_1.default)(b1) + flangeW1, y: (0, half_1.default)(h) - tf2 - webH };
    var clb = { x: -(0, half_1.default)(b1) + flangeW1, y: (0, half_1.default)(h) - tf2 };
    var lbt = { x: -(0, half_1.default)(b2), y: (0, half_1.default)(h) - tf2 };
    //둥근부분을 위한 좌표 계산
    // flange (r2)
    var rbt_st = { x: rbt.x, y: rbt.y + r2 };
    var rbt_ed = { x: rbt.x - r2, y: rbt.y };
    // web (r1)
    var crb_st = { x: crb.x + r1, y: crb.y };
    var crb_ed = { x: crb.x, y: crb.y - r1 };
    // web (r1)
    var crt_st = { x: crt.x, y: crt.y + r1 };
    var crt_ed = { x: crt.x + r1, y: crt.y };
    // flange (r2)
    var rtb_st = { x: rtb.x - r2, y: rtb.y };
    var rtb_ed = { x: rtb.x, y: rtb.y - r2 };
    // flange (r2)
    var ltb_st = { x: ltb.x, y: ltb.y - r2 };
    var ltb_ed = { x: ltb.x + r2, y: ltb.y };
    // web (r1)
    var clt_st = { x: clt.x - r1, y: clt.y };
    var clt_ed = { x: clt.x, y: clt.y + r1 };
    // web (r1)
    var clb_st = { x: clb.x, y: clb.y - r1 };
    var clb_ed = { x: clb.x - r1, y: clb.y };
    // flange (r2)
    var lbt_st = { x: lbt.x + r2, y: lbt.y };
    var lbt_ed = { x: lbt.x, y: lbt.y + r2 };
    vertices.push([
        lbb, rbb,
        rbt_st, rbt_ed,
        crb_st, crb_ed,
        crt_st, crt_ed,
        rtb_st, rtb_ed,
        rtt, ltt,
        ltb_st, ltb_ed,
        clt_st, clt_ed,
        clb_st, clb_ed,
        lbt_st, lbt_ed,
    ]);
    return vertices;
}
exports.default = toHSectionVertices;
