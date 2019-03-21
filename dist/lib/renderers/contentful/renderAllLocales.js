"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderUnion_1 = require("../typescript/renderUnion");
function renderAllLocales(locales) {
    return renderUnion_1.default("LOCALE_CODE", locales.map(function (locale) { return "'" + locale.code + "'"; }));
}
exports.default = renderAllLocales;
//# sourceMappingURL=renderAllLocales.js.map