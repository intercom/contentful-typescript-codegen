"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderInterfaceProperty(name, type, required, description) {
    return [
        descriptionComment(description),
        name,
        required ? "" : "?",
        ": ",
        type,
        required ? "" : " | undefined",
        ";",
    ].join("");
}
exports.default = renderInterfaceProperty;
function descriptionComment(description) {
    if (description) {
        return "/** " + description + " */\n";
    }
    else {
        return "";
    }
}
//# sourceMappingURL=renderInterfaceProperty.js.map