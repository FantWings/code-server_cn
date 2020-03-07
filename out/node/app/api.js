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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("@coder/logger");
var fs = __importStar(require("fs-extra"));
var path = __importStar(require("path"));
var url = __importStar(require("url"));
var WebSocket = __importStar(require("ws"));
var api_1 = require("../../common/api");
var http_1 = require("../../common/http");
var util_1 = require("../../common/util");
var http_2 = require("../http");
var bin_1 = require("./bin");
/**
 * API HTTP provider.
 */
var ApiHttpProvider = /** @class */ (function (_super) {
    __extends(ApiHttpProvider, _super);
    function ApiHttpProvider(options, server, vscode, dataDir) {
        var _this = _super.call(this, options) || this;
        _this.server = server;
        _this.vscode = vscode;
        _this.dataDir = dataDir;
        _this.ws = new WebSocket.Server({ noServer: true });
        _this.sessions = new Map();
        return _this;
    }
    ApiHttpProvider.prototype.dispose = function () {
        this.sessions.forEach(function (s) {
            if (s.process) {
                s.process.kill();
            }
        });
    };
    ApiHttpProvider.prototype.handleRequest = function (route, request) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        this.ensureAuthenticated(request);
                        if (route.requestPath !== "/index.html") {
                            throw new http_1.HttpError("Not found", http_1.HttpCode.NotFound);
                        }
                        _a = route.base;
                        switch (_a) {
                            case http_1.ApiEndpoint.applications: return [3 /*break*/, 1];
                            case http_1.ApiEndpoint.session: return [3 /*break*/, 3];
                            case http_1.ApiEndpoint.recent: return [3 /*break*/, 4];
                            case http_1.ApiEndpoint.running: return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 8];
                    case 1:
                        this.ensureMethod(request);
                        _b = {};
                        _c = {};
                        return [4 /*yield*/, this.applications()];
                    case 2: return [2 /*return*/, (_b.content = (_c.applications = _f.sent(),
                            _c),
                            _b)];
                    case 3: return [2 /*return*/, this.session(request)];
                    case 4:
                        this.ensureMethod(request);
                        _d = {};
                        return [4 /*yield*/, this.recent()];
                    case 5: return [2 /*return*/, (_d.content = _f.sent(),
                            _d)];
                    case 6:
                        this.ensureMethod(request);
                        _e = {};
                        return [4 /*yield*/, this.running()];
                    case 7: return [2 /*return*/, (_e.content = _f.sent(),
                            _e)];
                    case 8: throw new http_1.HttpError("Not found", http_1.HttpCode.NotFound);
                }
            });
        });
    };
    ApiHttpProvider.prototype.handleWebSocket = function (route, request, socket, head) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.authenticated(request)) {
                    throw new Error("not authenticated");
                }
                switch (route.base) {
                    case http_1.ApiEndpoint.status:
                        return [2 /*return*/, this.handleStatusSocket(request, socket, head)];
                    case http_1.ApiEndpoint.run:
                        return [2 /*return*/, this.handleRunSocket(route, request, socket, head)];
                }
                throw new http_1.HttpError("Not found", http_1.HttpCode.NotFound);
            });
        });
    };
    ApiHttpProvider.prototype.handleStatusSocket = function (request, socket, head) {
        return __awaiter(this, void 0, void 0, function () {
            var getMessageResponse;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getMessageResponse = function (event) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _a = event;
                                        switch (_a) {
                                            case "health": return [3 /*break*/, 1];
                                        }
                                        return [3 /*break*/, 3];
                                    case 1:
                                        _b = { event: event };
                                        return [4 /*yield*/, this.server.getConnections()];
                                    case 2: return [2 /*return*/, (_b.connections = _c.sent(), _b)];
                                    case 3: throw new Error("unexpected message");
                                }
                            });
                        }); };
                        return [4 /*yield*/, new Promise(function (resolve) {
                                _this.ws.handleUpgrade(request, socket, head, function (ws) {
                                    var send = function (event) {
                                        ws.send(JSON.stringify(event));
                                    };
                                    ws.on("message", function (data) {
                                        logger_1.logger.trace("got message", logger_1.field("message", data));
                                        try {
                                            var message = JSON.parse(data.toString());
                                            getMessageResponse(message.event).then(send);
                                        }
                                        catch (error) {
                                            logger_1.logger.error(error.message, logger_1.field("message", data));
                                        }
                                    });
                                    resolve();
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * A socket that connects to a session.
     */
    ApiHttpProvider.prototype.handleRunSocket = function (route, request, socket, head) {
        return __awaiter(this, void 0, void 0, function () {
            var sessionId, ws;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sessionId = route.requestPath.replace(/^\//, "");
                        logger_1.logger.debug("connecting session", logger_1.field("sessionId", sessionId));
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.ws.handleUpgrade(request, socket, head, function (socket) {
                                    socket.binaryType = "arraybuffer";
                                    var session = _this.sessions.get(sessionId);
                                    if (!session) {
                                        socket.close(api_1.SessionError.NotFound);
                                        return reject(new Error("session not found"));
                                    }
                                    resolve(socket);
                                    socket.on("error", function (error) {
                                        socket.close(api_1.SessionError.FailedToStart);
                                        logger_1.logger.error("got error while connecting socket", logger_1.field("error", error));
                                        reject(error);
                                    });
                                });
                            })
                            // Send ready message.
                        ];
                    case 1:
                        ws = _a.sent();
                        // Send ready message.
                        ws.send(Buffer.from(JSON.stringify({
                            protocol: "TODO",
                        })));
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * Return whitelisted applications.
     */
    ApiHttpProvider.prototype.applications = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, bin_1.findWhitelistedApplications()];
            });
        });
    };
    /**
     * Return installed applications.
     */
    ApiHttpProvider.prototype.installedApplications = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, bin_1.findApplications()];
            });
        });
    };
    /**
     * Get a running application.
     */
    ApiHttpProvider.prototype.getRunningApplication = function (sessionIdOrPath) {
        if (!sessionIdOrPath) {
            return undefined;
        }
        var sessionId = sessionIdOrPath.replace(/\//g, "");
        var session = this.sessions.get(sessionId);
        if (session) {
            logger_1.logger.debug("found application by session id", logger_1.field("id", sessionId));
            return session.app;
        }
        var base = util_1.normalize("/" + sessionIdOrPath);
        session = Array.from(this.sessions.values()).find(function (s) { return s.app.path === base; });
        if (session) {
            logger_1.logger.debug("found application by path", logger_1.field("path", base));
            return session.app;
        }
        logger_1.logger.debug("no application found matching route", logger_1.field("route", sessionIdOrPath));
        return undefined;
    };
    /**
     * Handle /session endpoint.
     */
    ApiHttpProvider.prototype.session = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a, parsed, app, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.ensureMethod(request, ["DELETE", "POST"]);
                        return [4 /*yield*/, this.getData(request)];
                    case 1:
                        data = _d.sent();
                        if (!data) {
                            throw new http_1.HttpError("Not found", http_1.HttpCode.NotFound);
                        }
                        _a = request.method;
                        switch (_a) {
                            case "DELETE": return [3 /*break*/, 2];
                            case "POST": return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 2: return [2 /*return*/, this.deleteSession(JSON.parse(data).sessionId)];
                    case 3:
                        parsed = JSON.parse(data);
                        app = this.getRunningApplication(parsed.sessionId || parsed.path);
                        if (app) {
                            return [2 /*return*/, {
                                    content: {
                                        created: false,
                                        sessionId: app.sessionId,
                                    },
                                }];
                        }
                        _b = {};
                        _c = {
                            created: true
                        };
                        return [4 /*yield*/, this.createSession(parsed)];
                    case 4: return [2 /*return*/, (_b.content = (_c.sessionId = _d.sent(),
                            _c),
                            _b)];
                    case 5: throw new http_1.HttpError("Not found", http_1.HttpCode.NotFound);
                }
            });
        });
    };
    /**
     * Kill a session identified by `app.sessionId`.
     */
    ApiHttpProvider.prototype.deleteSession = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, session;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.logger.debug("deleting session", logger_1.field("sessionId", sessionId));
                        _a = sessionId;
                        switch (_a) {
                            case "vscode": return [3 /*break*/, 1];
                        }
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.vscode.dispose()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, { code: http_1.HttpCode.Ok }];
                    case 3:
                        {
                            session = this.sessions.get(sessionId);
                            if (!session) {
                                throw new Error("session does not exist");
                            }
                            if (session.process) {
                                session.process.kill();
                            }
                            this.sessions.delete(sessionId);
                            return [2 /*return*/, { code: http_1.HttpCode.Ok }];
                        }
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create a new session and return the session ID.
     */
    ApiHttpProvider.prototype.createSession = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            var sessionId, appSession;
            return __generator(this, function (_a) {
                sessionId = Math.floor(Math.random() * 10000).toString();
                if (this.sessions.has(sessionId)) {
                    throw new Error("conflicting session id");
                }
                if (!app.exec) {
                    throw new Error("cannot execute application with no `exec`");
                }
                appSession = {
                    app: __assign(__assign({}, app), { sessionId: sessionId }),
                };
                this.sessions.set(sessionId, appSession);
                try {
                    throw new Error("TODO");
                }
                catch (error) {
                    this.sessions.delete(sessionId);
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Return VS Code's recent paths.
     */
    ApiHttpProvider.prototype.recent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var state, _a, _b, setting, pathPromises_1, workspacePromises_1, _c, paths, workspaces, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        if (!this.dataDir) {
                            throw new Error("data directory is not set");
                        }
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, fs.readFile(path.join(this.dataDir, "User/state/global.json"), "utf8")];
                    case 1:
                        state = _b.apply(_a, [_d.sent()]);
                        setting = Array.isArray(state) && state.find(function (item) { return item[0] === "recently.opened"; });
                        if (!setting) {
                            throw new Error("settings appear malformed");
                        }
                        pathPromises_1 = {};
                        workspacePromises_1 = {};
                        Object.values(JSON.parse(setting[1])).forEach(function (recents) {
                            recents.forEach(function (recent) {
                                try {
                                    var target = typeof recent === "string" ? pathPromises_1 : workspacePromises_1;
                                    var pathname_1 = url.parse(typeof recent === "string" ? recent : recent.configURIPath).pathname;
                                    if (pathname_1 && !target[pathname_1]) {
                                        target[pathname_1] = new Promise(function (resolve) {
                                            fs.stat(pathname_1)
                                                .then(function () { return resolve(pathname_1); })
                                                .catch(function () { return resolve(); });
                                        });
                                    }
                                }
                                catch (error) {
                                    logger_1.logger.debug("invalid path", logger_1.field("path", recent));
                                }
                            });
                        });
                        return [4 /*yield*/, Promise.all([
                                Promise.all(Object.values(pathPromises_1)),
                                Promise.all(Object.values(workspacePromises_1)),
                            ])];
                    case 2:
                        _c = _d.sent(), paths = _c[0], workspaces = _c[1];
                        return [2 /*return*/, {
                                paths: paths.filter(function (p) { return !!p; }),
                                workspaces: workspaces.filter(function (p) { return !!p; }),
                            }];
                    case 3:
                        error_1 = _d.sent();
                        if (error_1.code !== "ENOENT") {
                            throw error_1;
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, { paths: [], workspaces: [] }];
                }
            });
        });
    };
    /**
     * Return running sessions.
     */
    ApiHttpProvider.prototype.running = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        applications: (this.vscode.running
                            ? [
                                __assign(__assign({}, bin_1.Vscode), { sessionId: "vscode" }),
                            ]
                            : []).concat(Array.from(this.sessions).map(function (_a) {
                            var sessionId = _a[0], session = _a[1];
                            return (__assign(__assign({}, session.app), { sessionId: sessionId }));
                        })),
                    }];
            });
        });
    };
    /**
     * For these, just return the error message since they'll be requested as
     * JSON.
     */
    ApiHttpProvider.prototype.getErrorRoot = function (_route, _title, _header, error) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        content: JSON.stringify({ error: error }),
                    }];
            });
        });
    };
    return ApiHttpProvider;
}(http_2.HttpProvider));
exports.ApiHttpProvider = ApiHttpProvider;
//# sourceMappingURL=api.js.map