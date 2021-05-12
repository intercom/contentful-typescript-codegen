"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var render_1 = require("./renderers/render");
var renderFieldsOnly_1 = require("./renderers/renderFieldsOnly");
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var meow = require("meow");
var cli = meow("\n  Usage\n    $ contentful-typescript-codegen --output <file> <options>\n\n  Options\n    --output,      -o  Where to write to\n    --poll,        -p  Continuously refresh types\n    --interval N,  -i  The interval in seconds at which to poll (defaults to 15)\n    --namespace N, -n  Wrap types in namespace N (disabled by default)\n    --fields-only      Output a tree that _only_ ensures fields are valid\n                       and present, and does not provide types for Sys,\n                       Assets, or Rich Text. This is useful for ensuring raw\n                       Contentful responses will be compatible with your code.\n    --localization -l  Output fields with localized values\n\n  Examples\n    $ contentful-typescript-codegen -o src/@types/generated/contentful.d.ts\n", {
    flags: {
        output: {
            type: "string",
            alias: "o",
            isRequired: true,
        },
        fieldsOnly: {
            type: "boolean",
            isRequired: false,
        },
        poll: {
            type: "boolean",
            alias: "p",
            isRequired: false,
        },
        interval: {
            type: "string",
            alias: "i",
            isRequired: false,
        },
        namespace: {
            type: "string",
            alias: "n",
            isRequired: false,
        },
        localization: {
            type: "boolean",
            alias: "l",
            isRequired: false,
        },
    },
});
function runCodegen(outputFile) {
    return __awaiter(this, void 0, void 0, function () {
        var getEnvironmentPath, getEnvironment, environment, contentTypes, locales, outputPath, output;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getEnvironmentPath = path_1.default.resolve(process.cwd(), "./getContentfulEnvironment.js");
                    getEnvironment = require(getEnvironmentPath);
                    return [4 /*yield*/, getEnvironment()];
                case 1:
                    environment = _a.sent();
                    return [4 /*yield*/, environment.getContentTypes({ limit: 1000 })];
                case 2:
                    contentTypes = _a.sent();
                    return [4 /*yield*/, environment.getLocales()];
                case 3:
                    locales = _a.sent();
                    outputPath = path_1.default.resolve(process.cwd(), outputFile);
                    if (!cli.flags.fieldsOnly) return [3 /*break*/, 5];
                    return [4 /*yield*/, renderFieldsOnly_1.default(contentTypes.items, { namespace: cli.flags.namespace })];
                case 4:
                    output = _a.sent();
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, render_1.default(contentTypes.items, locales.items, {
                        localization: cli.flags.localization,
                        namespace: cli.flags.namespace,
                    })];
                case 6:
                    output = _a.sent();
                    _a.label = 7;
                case 7:
                    fs_extra_1.outputFileSync(outputPath, output);
                    return [2 /*return*/];
            }
        });
    });
}
runCodegen(cli.flags.output).catch(function (error) {
    console.error(error);
    process.exit(1);
});
if (cli.flags.poll) {
    var intervalInSeconds = parseInt(cli.flags.interval, 10);
    if (!isNaN(intervalInSeconds) && intervalInSeconds > 0) {
        setInterval(function () { return runCodegen(cli.flags.output); }, intervalInSeconds * 1000);
    }
    else {
        throw new Error("Expected a positive numeric interval, but got " + cli.flags.interval);
    }
}
//# sourceMappingURL=contentful-typescript-codegen.js.map