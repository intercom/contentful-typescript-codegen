"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderInterface(_a) {
    var name = _a.name, extension = _a.extension, fields = _a.fields, description = _a.description;
    return "\n    " + (description ? "/** " + description + " */" : "") + "\n    export interface " + name + " " + (extension ? "extends " + extension : "") + " {\n      " + fields + "\n    }\n  ";
}
exports.default = renderInterface;
//# sourceMappingURL=renderInterface.js.map