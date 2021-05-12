"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderNamespace(source, namespace) {
    if (!namespace)
        return source;
    return "\n    declare namespace " + namespace + " {\n    " + source + "\n    }\n\n    export as namespace " + namespace + "\n    export=" + namespace + "\n  ";
}
exports.default = renderNamespace;
//# sourceMappingURL=renderNamespace.js.map