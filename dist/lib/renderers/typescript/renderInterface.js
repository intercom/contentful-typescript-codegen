"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderInterface(name, fields, description) {
    return "\n    export interface " + name + "Fields {\n      " + fields + "\n    };\n\n    " + descriptionComment(description) + "\n    export interface " + name + " extends Entry<" + name + "Fields> {};\n  ";
}
exports.default = renderInterface;
function descriptionComment(description) {
    if (description) {
        return "/** " + description + " */";
    }
    return "";
}
//# sourceMappingURL=renderInterface.js.map