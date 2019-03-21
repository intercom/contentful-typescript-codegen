"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderInterface_1 = require("../typescript/renderInterface");
var renderField_1 = require("./renderField");
var renderContentTypeId_1 = require("./renderContentTypeId");
var renderArray_1 = require("./fields/renderArray");
var renderBoolean_1 = require("./fields/renderBoolean");
var renderLink_1 = require("./fields/renderLink");
var renderLocation_1 = require("./fields/renderLocation");
var renderNumber_1 = require("./fields/renderNumber");
var renderObject_1 = require("./fields/renderObject");
var renderRichText_1 = require("./fields/renderRichText");
var renderSymbol_1 = require("./fields/renderSymbol");
function renderContentType(contentType) {
    return renderInterface_1.default(renderContentTypeId_1.default(contentType.sys.id), renderContentTypeFields(contentType.fields), contentType.description);
}
exports.default = renderContentType;
function renderContentTypeFields(fields) {
    return fields
        .map(function (field) {
        var functionMap = {
            Array: renderArray_1.default,
            Boolean: renderBoolean_1.default,
            Date: renderSymbol_1.default,
            Integer: renderNumber_1.default,
            Link: renderLink_1.default,
            Location: renderLocation_1.default,
            Number: renderNumber_1.default,
            Object: renderObject_1.default,
            RichText: renderRichText_1.default,
            Symbol: renderSymbol_1.default,
            Text: renderSymbol_1.default,
        };
        return renderField_1.default(field, functionMap[field.type](field));
    })
        .join("\n\n");
}
//# sourceMappingURL=renderContentType.js.map