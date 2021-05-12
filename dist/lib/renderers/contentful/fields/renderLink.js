"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderContentTypeId_1 = require("../renderContentTypeId");
var renderUnion_1 = require("../../typescript/renderUnion");
function renderLink(field) {
    if (field.linkType === "Asset") {
        return "Asset";
    }
    if (field.linkType === "Entry") {
        var contentTypeValidation = field.validations.find(function (validation) { return !!validation.linkContentType; });
        if (contentTypeValidation) {
            return renderUnion_1.renderUnionValues(contentTypeValidation.linkContentType.map(renderContentTypeId_1.default));
        }
        else {
            return "Entry<{ [fieldId: string]: unknown }>";
        }
    }
    return "unknown";
}
exports.default = renderLink;
//# sourceMappingURL=renderLink.js.map