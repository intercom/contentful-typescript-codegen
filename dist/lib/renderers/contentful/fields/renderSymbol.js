"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderUnion_1 = require("../../typescript/renderUnion");
function renderSymbol(field) {
    var inValidation = field.validations.find(function (validation) { return !!validation.in; });
    if (inValidation) {
        return renderUnion_1.renderUnionValues(inValidation.in.map(function (value) { return "'" + value + "'"; }));
    }
    else {
        return "string";
    }
}
exports.default = renderSymbol;
//# sourceMappingURL=renderSymbol.js.map