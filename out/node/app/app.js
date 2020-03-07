"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var http_1 = require("../../common/http");
var http_2 = require("../http");
/**
 * App/fallback HTTP provider.
 */
var AppHttpProvider = /** @class */ (function (_super) {
    __extends(AppHttpProvider, _super);
    function AppHttpProvider(options, api) {
        var _this = _super.call(this, options) || this;
        _this.api = api;
        return _this;
    }
    AppHttpProvider.prototype.handleRequest = function (route, request) {
        return __awaiter(this, void 0, void 0, function () {
            var app, sessionId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.authenticated(request)) {
                            return [2 /*return*/, { redirect: "/login", query: { to: route.fullPath } }];
                        }
                        this.ensureMethod(request);
                        if (route.requestPath !== "/index.html") {
                            throw new http_1.HttpError("Not found", http_1.HttpCode.NotFound);
                        }
                        app = this.api.getRunningApplication(route.base);
                        sessionId = app && app.sessionId;
                        if (!!app) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.api.installedApplications()];
                    case 1:
                        app = (_a.sent()).find(function (a) { return a.path === route.base; });
                        if (!(app && app.exec)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.api.createSession(app)];
                    case 2:
                        sessionId = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (sessionId) {
                            return [2 /*return*/, this.getAppRoot(route, (app && app.name) || "", sessionId)];
                        }
                        throw new http_1.HttpError("Application not found", http_1.HttpCode.NotFound);
                }
            });
        });
    };
    AppHttpProvider.prototype.getAppRoot = function (route, name, sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUtf8Resource(this.rootPath, "src/browser/pages/app.html")];
                    case 1:
                        response = _a.sent();
                        response.content = response.content.replace(/{{APP_NAME}}/, name);
                        return [2 /*return*/, this.replaceTemplates(route, response, sessionId)];
                }
            });
        });
    };
    return AppHttpProvider;
}(http_2.HttpProvider));
exports.AppHttpProvider = AppHttpProvider;
//# sourceMappingURL=app.js.map