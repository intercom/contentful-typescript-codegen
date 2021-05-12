"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** renders helper types for --localization flag */
function renderLocalizedTypes(localization) {
    if (!localization)
        return null;
    return "\n    export type LocalizedField<T> = Partial<Record<LOCALE_CODE, T>>\n  \n    // We have to use our own localized version of Asset because of a bug in contentful https://github.com/contentful/contentful.js/issues/208\n    export interface Asset {\n      sys: Sys\n      fields: {\n        title: LocalizedField<string>\n        description: LocalizedField<string>\n        file: LocalizedField<{\n          url: string\n          details: {\n            size: number\n            image?: {\n              width: number\n              height: number\n            }\n          }\n          fileName: string\n          contentType: string\n        }>\n      }\n      toPlainObject(): object\n    }\n  ";
}
exports.default = renderLocalizedTypes;
//# sourceMappingURL=renderLocalizedTypes.js.map