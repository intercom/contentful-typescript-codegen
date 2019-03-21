"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function renderContentTypeId(contentTypeId) {
    return "I" + lodash_1.upperFirst(lodash_1.camelCase(contentTypeId));
}
exports.default = renderContentTypeId;
//# sourceMappingURL=renderContentTypeId.js.map