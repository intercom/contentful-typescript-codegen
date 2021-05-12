"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderInterfaceProperty_1 = require("../typescript/renderInterfaceProperty");
function renderField(field, type, localization) {
    if (localization === void 0) { localization = false; }
    return renderInterfaceProperty_1.default(field.id, type, field.required, localization, field.name);
}
exports.default = renderField;
//# sourceMappingURL=renderField.js.map