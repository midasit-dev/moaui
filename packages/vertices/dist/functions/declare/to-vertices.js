"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toVertices = void 0;
var h_section_1 = require("./h-section");
var solid_rectangle_1 = require("./solid-rectangle");
/** @Export */
function toVertices(props) {
    try {
        if (!props)
            throw new Error('props is required');
        return doConvert(props);
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error)
            return error;
        return new Error('An error occurred while toVertices');
    }
}
exports.toVertices = toVertices;
function doConvert(props) {
    var type = props.type, properties = props.properties;
    switch (type) {
        case 'SolidRectangle': return (0, solid_rectangle_1.default)(properties);
        case 'HSection': return (0, h_section_1.default)(properties);
        default: throw new Error('type is not found');
    }
}
