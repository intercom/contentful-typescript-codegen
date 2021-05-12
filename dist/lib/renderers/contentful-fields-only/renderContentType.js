"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderInterface_1 = require("../typescript/renderInterface");
var renderField_1 = require("../contentful/renderField");
var renderContentTypeId_1 = require("../contentful/renderContentTypeId");
var renderArray_1 = require("../contentful-fields-only/fields/renderArray");
var renderLink_1 = require("../contentful-fields-only/fields/renderLink");
var renderRichText_1 = require("../contentful-fields-only/fields/renderRichText");
var renderBoolean_1 = require("../contentful/fields/renderBoolean");
var renderLocation_1 = require("../contentful/fields/renderLocation");
var renderNumber_1 = require("../contentful/fields/renderNumber");
var renderObject_1 = require("../contentful/fields/renderObject");
var renderSymbol_1 = require("../contentful/fields/renderSymbol");
function renderContentType(contentType) {
    var name = renderContentTypeId_1.default(contentType.sys.id);
    var fields = renderContentTypeFields(contentType.fields);
    return renderInterface_1.default({
        name: name,
        fields: "\n      fields: { " + fields + " };\n      [otherKeys: string]: any;\n    ",
    });
}
exports.default = renderContentType;
function renderContentTypeFields(fields) {
    return fields
        .filter(function (field) { return !field.omitted; })
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