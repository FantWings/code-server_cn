#!/usr/bin/env node
"use strict";
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
var cp = __importStar(require("child_process"));
var path = __importStar(require("path"));
var api_1 = require("./app/api");
var dashboard_1 = require("./app/dashboard");
var login_1 = require("./app/login");
var proxy_1 = require("./app/proxy");
var static_1 = require("./app/static");
var update_1 = require("./app/update");
var vscode_1 = require("./app/vscode");
var cli_1 = require("./cli");
var http_1 = require("./http");
var util_1 = require("./util");
var wrapper_1 = require("./wrapper");
process.on("uncaughtException", function (error) {
    logger_1.logger.error("Uncaught exception: " + error.message);
    if (typeof error.stack !== "undefined") {
        logger_1.logger.error(error.stack);
    }
});
var pkg = {};
try {
    pkg = require("../../package.json");
}
catch (error) {
    logger_1.logger.warn(error.message);
}
var version = pkg.version || "development";
var commit = pkg.commit || "development";
var main = function (cliArgs) { return __awaiter(void 0, void 0, void 0, function () {
    var configArgs, args, envPassword, password, _a, host, port, options, _b, _c, httpServer, vscode, api, update, serverAddress, openAddress;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, cli_1.readConfigFile(cliArgs.config)
                // This prioritizes the flags set in args over the ones in the config file.
            ];
            case 1:
                configArgs = _d.sent();
                args = Object.assign(configArgs, cliArgs);
                if (!args.auth) {
                    args = __assign(__assign({}, args), { auth: http_1.AuthType.Password });
                }
                logger_1.logger.info("Using user-data-dir " + util_1.humanPath(args["user-data-dir"]));
                logger_1.logger.trace("Using extensions-dir " + util_1.humanPath(args["extensions-dir"]));
                envPassword = !!process.env.PASSWORD;
                password = args.auth === http_1.AuthType.Password && (process.env.PASSWORD || args.password);
                if (args.auth === http_1.AuthType.Password && !password) {
                    throw new Error("Please pass in a password via the config file or $PASSWORD");
                }
                _a = cli_1.bindAddrFromAllSources(cliArgs, configArgs), host = _a[0], port = _a[1];
                _b = [{ auth: args.auth, commit: commit, host: host, 
                        // The hash does not add any actual security but we do it for obfuscation purposes.
                        password: password ? util_1.hash(password) : undefined, port: port, proxyDomains: args["proxy-domain"], socket: args.socket }];
                if (!(args.cert && !args.cert.value)) return [3 /*break*/, 3];
                return [4 /*yield*/, util_1.generateCertificate()];
            case 2:
                _c = _d.sent();
                return [3 /*break*/, 4];
            case 3:
                _c = {
                    cert: args.cert && args.cert.value,
                    certKey: args["cert-key"],
                };
                _d.label = 4;
            case 4:
                options = __assign.apply(void 0, _b.concat([(_c)]));
                if (options.cert && !options.certKey) {
                    throw new Error("--cert-key is missing");
                }
                httpServer = new http_1.HttpServer(options);
                vscode = httpServer.registerHttpProvider("/", vscode_1.VscodeHttpProvider, args);
                api = httpServer.registerHttpProvider("/api", api_1.ApiHttpProvider, httpServer, vscode, args["user-data-dir"]);
                update = httpServer.registerHttpProvider("/update", update_1.UpdateHttpProvider, false);
                httpServer.registerHttpProvider("/proxy", proxy_1.ProxyHttpProvider);
                httpServer.registerHttpProvider("/login", login_1.LoginHttpProvider, args.config, envPassword);
                httpServer.registerHttpProvider("/static", static_1.StaticHttpProvider);
                httpServer.registerHttpProvider("/dashboard", dashboard_1.DashboardHttpProvider, api, update);
                wrapper_1.ipcMain().onDispose(function () { return httpServer.dispose(); });
                logger_1.logger.info("code-server " + version + " " + commit);
                return [4 /*yield*/, httpServer.listen()];
            case 5:
                serverAddress = _d.sent();
                logger_1.logger.info("HTTP server listening on " + serverAddress);
                if (args.auth === http_1.AuthType.Password) {
                    if (envPassword) {
                        logger_1.logger.info("    - Using password from $PASSWORD");
                    }
                    else {
                        logger_1.logger.info("    - Using password from " + util_1.humanPath(args.config));
                    }
                    logger_1.logger.info("    - To disable use `--auth none`");
                }
                else {
                    logger_1.logger.info("  - No authentication");
                }
                delete process.env.PASSWORD;
                if (httpServer.protocol === "https") {
                    logger_1.logger.info(args.cert && args.cert.value
                        ? "  - Using provided certificate and key for HTTPS"
                        : "  - Using generated certificate and key for HTTPS");
                }
                else {
                    logger_1.logger.info("  - Not serving HTTPS");
                }
                if (httpServer.proxyDomains.size > 0) {
                    logger_1.logger.info("  - Proxying the following domain" + (httpServer.proxyDomains.size === 1 ? "" : "s") + ":");
                    httpServer.proxyDomains.forEach(function (domain) { return logger_1.logger.info("    - *." + domain); });
                }
                if (!(serverAddress && !options.socket && args.open)) return [3 /*break*/, 7];
                openAddress = serverAddress.replace(/:\/\/0.0.0.0/, "://localhost");
                return [4 /*yield*/, util_1.open(openAddress).catch(console.error)];
            case 6:
                _d.sent();
                logger_1.logger.info("Opened " + openAddress);
                _d.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); };
function entry() {
    return __awaiter(this, void 0, void 0, function () {
        var tryParse, args, vscode_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tryParse = function () { return __awaiter(_this, void 0, void 0, function () {
                        var error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, cli_1.parse(process.argv.slice(2))];
                                case 1: return [2 /*return*/, _a.sent()];
                                case 2:
                                    error_1 = _a.sent();
                                    console.error(error_1.message);
                                    process.exit(1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); };
                    return [4 /*yield*/, tryParse()];
                case 1:
                    args = _a.sent();
                    if (args.help) {
                        console.log("code-server", version, commit);
                        console.log("");
                        console.log("Usage: code-server [options] [path]");
                        console.log("");
                        console.log("Options");
                        cli_1.optionDescriptions().forEach(function (description) {
                            console.log("", description);
                        });
                    }
                    else if (args.version) {
                        if (args.json) {
                            console.log({
                                codeServer: version,
                                commit: commit,
                                vscode: require("../../lib/vscode/package.json").version,
                            });
                        }
                        else {
                            console.log(version, commit);
                        }
                        process.exit(0);
                    }
                    else if (args["list-extensions"] || args["install-extension"] || args["uninstall-extension"]) {
                        logger_1.logger.debug("forking vs code cli...");
                        vscode_2 = cp.fork(path.resolve(__dirname, "../../lib/vscode/out/vs/server/fork"), [], {
                            env: __assign(__assign({}, process.env), { CODE_SERVER_PARENT_PID: process.pid.toString() }),
                        });
                        vscode_2.once("message", function (message) {
                            logger_1.logger.debug("Got message from VS Code", logger_1.field("message", message));
                            if (message.type !== "ready") {
                                logger_1.logger.error("Unexpected response waiting for ready response");
                                process.exit(1);
                            }
                            var send = { type: "cli", args: args };
                            vscode_2.send(send);
                        });
                        vscode_2.once("error", function (error) {
                            logger_1.logger.error(error.message);
                            process.exit(1);
                        });
                        vscode_2.on("exit", function (code) { return process.exit(code || 0); });
                    }
                    else {
                        wrapper_1.wrap(function () { return main(args); });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
entry();
//# sourceMappingURL=entry.js.map