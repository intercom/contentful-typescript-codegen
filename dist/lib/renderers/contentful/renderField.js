"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderInterfaceProperty_1 = require("../typescript/renderInterfaceProperty");
function renderField(field, type) {
    return renderInterfaceProperty_1.default(field.id, type, field.required, field.name);
}
exports.default = renderField;
//# sourceMappingURL=renderField.js.map