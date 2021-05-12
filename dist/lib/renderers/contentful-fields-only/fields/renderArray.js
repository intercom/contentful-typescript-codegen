"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var renderSymbol_1 = require("../../contentful/fields/renderSymbol");
var renderLink_1 = require("../../contentful-fields-only/fields/renderLink");
var renderArrayOf_1 = require("../../typescript/renderArrayOf");
function renderArray(field) {
    if (!field.items) {
        throw new Error("Cannot render non-array field " + field.id + " as an array");
    }
    var fieldWithValidations = __assign(__assign({}, field), { linkType: field.items.linkType, validations: field.items.validations || [] });
    switch (field.items.type) {
        case "Symbol": {
            return renderArrayOf_1.default(renderSymbol_1.default(fieldWithValidations));
        }
        case "Link": {
            return renderArrayOf_1.default(renderLink_1.default(fieldWithValidations));
        }
    }
    return renderArrayOf_1.default("unknown");
}
exports.default = renderArray;
//# sourceMappingURL=renderArray.js.map