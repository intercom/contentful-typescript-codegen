"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderDefaultLocale(locales) {
    var defaultLocale = locales.find(function (locale) { return locale.default; });
    if (!defaultLocale) {
        throw new Error("Could not find a default locale in Contentful.");
    }
    return "type CONTENTFUL_DEFAULT_LOCALE_CODE = '" + defaultLocale.code + "';";
}
exports.default = renderDefaultLocale;
//# sourceMappingURL=renderDefaultLocale.js.map