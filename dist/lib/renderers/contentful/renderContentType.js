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
function renderContentType(contentType, localization) {
    var name = renderContentTypeId_1.default(contentType.sys.id);
    var fields = renderContentTypeFields(contentType.fields, localization);
    var sys = renderSys(contentType.sys);
    return "\n    " + renderInterface_1.default({ name: name + "Fields", fields: fields }) + "\n\n    " + descriptionComment(contentType.description) + "\n    " + renderInterface_1.default({ name: name, extension: "Entry<" + name + "Fields>", fields: sys }) + "\n  ";
}
exports.default = renderContentType;
function descriptionComment(description) {
    if (description) {
        return "/** " + description + " */";
    }
    return "";
}
function renderContentTypeFields(fields, localization) {
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
        return renderField_1.default(field, functionMap[field.type](field), localization);
    })
        .join("\n\n");
}
function renderSys(sys) {
    return "\n    sys: {\n      id: string;\n      type: string;\n      createdAt: string;\n      updatedAt: string;\n      locale: string;\n      contentType: {\n        sys: {\n          id: '" + sys.id + "';\n          linkType: 'ContentType';\n          type: 'Link';\n        }\n      }\n    }\n  ";
}
//# sourceMappingURL=renderContentType.js.map