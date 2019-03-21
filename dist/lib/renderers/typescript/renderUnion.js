"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderUnion(name, values) {
    return "\n    type " + name + " = " + renderUnionValues(values) + ";\n  ";
}
exports.default = renderUnion;
function renderUnionValues(values) {
    if (values.length === 0) {
        return "never";
    }
    else {
        return values.join(" | ");
    }
}
exports.renderUnionValues = renderUnionValues;
//# sourceMappingURL=renderUnion.js.map