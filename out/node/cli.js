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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("@coder/logger");
var fs = __importStar(require("fs-extra"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var os = __importStar(require("os"));
var path = __importStar(require("path"));
var http_1 = require("./http");
var util_1 = require("./util");
var Optional = /** @class */ (function () {
    function Optional(value) {
        this.value = value;
    }
    return Optional;
}());
exports.Optional = Optional;
var LogLevel;
(function (LogLevel) {
    LogLevel["Trace"] = "trace";
    LogLevel["Debug"] = "debug";
    LogLevel["Info"] = "info";
    LogLevel["Warn"] = "warn";
    LogLevel["Error"] = "error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var OptionalString = /** @class */ (function (_super) {
    __extends(OptionalString, _super);
    function OptionalString() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return OptionalString;
}(Optional));
exports.OptionalString = OptionalString;
var options = {
    auth: { type: http_1.AuthType, description: "The type of authentication to use." },
    password: {
        type: "string",
        description: "The password for password authentication (can only be passed in via $PASSWORD or the config file).",
    },
    cert: {
        type: OptionalString,
        path: true,
        description: "Path to certificate. Generated if no path is provided.",
    },
    "cert-key": { type: "string", path: true, description: "Path to certificate key when using non-generated cert." },
    "disable-telemetry": { type: "boolean", description: "Disable telemetry." },
    help: { type: "boolean", short: "h", description: "Show this output." },
    json: { type: "boolean" },
    open: { type: "boolean", description: "Open in browser on startup. Does not work remotely." },
    "bind-addr": {
        type: "string",
        description: "Address to bind to in host:port. You can also use $PORT to override the port.",
    },
    config: {
        type: "string",
        description: "Path to yaml config file. Every flag maps directly to a key in the config file.",
    },
    // These two have been deprecated by bindAddr.
    host: { type: "string", description: "" },
    port: { type: "number", description: "" },
    socket: { type: "string", path: true, description: "Path to a socket (bind-addr will be ignored)." },
    version: { type: "boolean", short: "v", description: "Display version information." },
    _: { type: "string[]" },
    "user-data-dir": { type: "string", path: true, description: "Path to the user data directory." },
    "extensions-dir": { type: "string", path: true, description: "Path to the extensions directory." },
    "builtin-extensions-dir": { type: "string", path: true },
    "extra-extensions-dir": { type: "string[]", path: true },
    "extra-builtin-extensions-dir": { type: "string[]", path: true },
    "list-extensions": { type: "boolean", description: "List installed VS Code extensions." },
    force: { type: "boolean", description: "Avoid prompts when installing VS Code extensions." },
    "install-extension": { type: "string[]", description: "Install or update a VS Code extension by id or vsix." },
    "uninstall-extension": { type: "string[]", description: "Uninstall a VS Code extension by id." },
    "show-versions": { type: "boolean", description: "Show VS Code extension versions." },
    "proxy-domain": { type: "string[]", description: "Domain used for proxying ports." },
    locale: { type: "string" },
    log: { type: LogLevel },
    verbose: { type: "boolean", short: "vvv", description: "Enable verbose logging." },
};
exports.optionDescriptions = function () {
    var entries = Object.entries(options).filter(function (_a) {
        var v = _a[1];
        return !!v.description;
    });
    var widths = entries.reduce(function (prev, _a) {
        var k = _a[0], v = _a[1];
        return ({
            long: k.length > prev.long ? k.length : prev.long,
            short: v.short && v.short.length > prev.short ? v.short.length : prev.short,
        });
    }, { short: 0, long: 0 });
    return entries.map(function (_a) {
        var k = _a[0], v = _a[1];
        return "" + " ".repeat(widths.short - (v.short ? v.short.length : 0)) + (v.short ? "-" + v.short : " ") + " --" + k + " ".repeat(widths.long - k.length) + " " + v.description + (typeof v.type === "object" ? " [" + Object.values(v.type).join(", ") + "]" : "");
    });
};
exports.parse = function (argv, opts) { return __awaiter(void 0, void 0, void 0, function () {
    var error, args, ended, _loop_1, out_i_1, i;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                error = function (msg) {
                    var _a;
                    if ((_a = opts) === null || _a === void 0 ? void 0 : _a.configFile) {
                        msg = "error reading " + opts.configFile + ": " + msg;
                    }
                    return new Error(msg);
                };
                args = { _: [] };
                ended = false;
                _loop_1 = function (i) {
                    var arg = argv[i];
                    // -- signals the end of option parsing.
                    if (!ended && arg == "--") {
                        ended = true;
                        return out_i_1 = i, "continue";
                    }
                    // Options start with a dash and require a value if non-boolean.
                    if (!ended && arg.startsWith("-")) {
                        var key = void 0;
                        var value = void 0;
                        if (arg.startsWith("--")) {
                            var split = arg.replace(/^--/, "").split("=", 2);
                            key = split[0];
                            value = split[1];
                        }
                        else {
                            var short_1 = arg.replace(/^-/, "");
                            var pair = Object.entries(options).find(function (_a) {
                                var v = _a[1];
                                return v.short === short_1;
                            });
                            if (pair) {
                                key = pair[0];
                            }
                        }
                        if (!key || !options[key]) {
                            throw error("Unknown option " + arg);
                        }
                        if (key === "password" && !((_a = opts) === null || _a === void 0 ? void 0 : _a.configFile)) {
                            throw new Error("--password can only be set in the config file or passed in via $PASSWORD");
                        }
                        var option = options[key];
                        if (option.type === "boolean") {
                            ;
                            args[key] = true;
                            return out_i_1 = i, "continue";
                        }
                        // Might already have a value if it was the --long=value format.
                        if (typeof value === "undefined") {
                            // A value is only valid if it doesn't look like an option.
                            value = argv[i + 1] && !argv[i + 1].startsWith("-") ? argv[++i] : undefined;
                        }
                        if (!value && option.type === OptionalString) {
                            ;
                            args[key] = new OptionalString(value);
                            return out_i_1 = i, "continue";
                        }
                        else if (!value) {
                            throw error("--" + key + " requires a value");
                        }
                        if (option.type == OptionalString && value == "false") {
                            return out_i_1 = i, "continue";
                        }
                        if (option.path) {
                            value = path.resolve(value);
                        }
                        switch (option.type) {
                            case "string":
                                ;
                                args[key] = value;
                                break;
                            case "string[]":
                                if (!args[key]) {
                                    ;
                                    args[key] = [];
                                }
                                ;
                                args[key].push(value);
                                break;
                            case "number":
                                ;
                                args[key] = parseInt(value, 10);
                                if (isNaN(args[key])) {
                                    throw error("--" + key + " must be a number");
                                }
                                break;
                            case OptionalString:
                                ;
                                args[key] = new OptionalString(value);
                                break;
                            default: {
                                if (!Object.values(option.type).includes(value)) {
                                    throw error("--" + key + " valid values: [" + Object.values(option.type).join(", ") + "]");
                                }
                                ;
                                args[key] = value;
                                break;
                            }
                        }
                        return out_i_1 = i, "continue";
                    }
                    // Everything else goes into _.
                    args._.push(arg);
                    out_i_1 = i;
                };
                for (i = 0; i < argv.length; ++i) {
                    _loop_1(i);
                    i = out_i_1;
                }
                logger_1.logger.debug("parsed command line", logger_1.field("args", args));
                // --verbose takes priority over --log and --log takes priority over the
                // environment variable.
                if (args.verbose) {
                    args.log = LogLevel.Trace;
                }
                else if (!args.log &&
                    process.env.LOG_LEVEL &&
                    Object.values(LogLevel).includes(process.env.LOG_LEVEL)) {
                    args.log = process.env.LOG_LEVEL;
                }
                // Sync --log, --verbose, the environment variable, and logger level.
                if (args.log) {
                    process.env.LOG_LEVEL = args.log;
                }
                switch (args.log) {
                    case LogLevel.Trace:
                        logger_1.logger.level = logger_1.Level.Trace;
                        args.verbose = true;
                        break;
                    case LogLevel.Debug:
                        logger_1.logger.level = logger_1.Level.Debug;
                        break;
                    case LogLevel.Info:
                        logger_1.logger.level = logger_1.Level.Info;
                        break;
                    case LogLevel.Warn:
                        logger_1.logger.level = logger_1.Level.Warning;
                        break;
                    case LogLevel.Error:
                        logger_1.logger.level = logger_1.Level.Error;
                        break;
                }
                if (!!args["user-data-dir"]) return [3 /*break*/, 2];
                return [4 /*yield*/, copyOldMacOSDataDir()];
            case 1:
                _b.sent();
                args["user-data-dir"] = util_1.paths.data;
                _b.label = 2;
            case 2:
                if (!args["extensions-dir"]) {
                    args["extensions-dir"] = path.join(args["user-data-dir"], "extensions");
                }
                return [2 /*return*/, args];
        }
    });
}); };
function defaultConfigFile() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = "bind-addr: 127.0.0.1:8080\nauth: password\npassword: ";
                    return [4 /*yield*/, util_1.generatePassword()];
                case 1: return [2 /*return*/, _a + (_b.sent()) + "\ncert: false\n"];
            }
        });
    });
}
/**
 * Reads the code-server yaml config file and returns it as Args.
 *
 * @param configPath Read the config from configPath instead of $CODE_SERVER_CONFIG or the default.
 */
function readConfigFile(configPath) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, configFile, config, configFileArgv, args;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!configPath) {
                        configPath = process.env.CODE_SERVER_CONFIG;
                        if (!configPath) {
                            configPath = path.join(util_1.paths.config, "config.yaml");
                        }
                    }
                    return [4 /*yield*/, fs.pathExists(configPath)];
                case 1:
                    if (!!(_d.sent())) return [3 /*break*/, 4];
                    _b = (_a = fs).outputFile;
                    _c = [configPath];
                    return [4 /*yield*/, defaultConfigFile()];
                case 2: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent()]))];
                case 3:
                    _d.sent();
                    logger_1.logger.info("Wrote default config file to " + util_1.humanPath(configPath));
                    _d.label = 4;
                case 4:
                    logger_1.logger.info("Using config file " + util_1.humanPath(configPath));
                    return [4 /*yield*/, fs.readFile(configPath)];
                case 5:
                    configFile = _d.sent();
                    config = js_yaml_1.default.safeLoad(configFile.toString(), {
                        filename: configPath,
                    });
                    configFileArgv = Object.entries(config).map(function (_a) {
                        var optName = _a[0], opt = _a[1];
                        if (opt === true) {
                            return "--" + optName;
                        }
                        return "--" + optName + "=" + opt;
                    });
                    return [4 /*yield*/, exports.parse(configFileArgv, {
                            configFile: configPath,
                        })];
                case 6:
                    args = _d.sent();
                    return [2 /*return*/, __assign(__assign({}, args), { config: configPath })];
            }
        });
    });
}
exports.readConfigFile = readConfigFile;
function parseBindAddr(bindAddr) {
    var u = new URL("http://" + bindAddr);
    return [u.hostname, parseInt(u.port, 10)];
}
function bindAddrFromArgs(addr, args) {
    var _a;
    addr = __assign({}, addr);
    if (args["bind-addr"]) {
        ;
        _a = parseBindAddr(args["bind-addr"]), addr.host = _a[0], addr.port = _a[1];
    }
    if (args.host) {
        addr.host = args.host;
    }
    if (process.env.PORT) {
        addr.port = parseInt(process.env.PORT, 10);
    }
    if (args.port !== undefined) {
        addr.port = args.port;
    }
    return addr;
}
function bindAddrFromAllSources(cliArgs, configArgs) {
    var addr = {
        host: "localhost",
        port: 8080,
    };
    addr = bindAddrFromArgs(addr, configArgs);
    addr = bindAddrFromArgs(addr, cliArgs);
    return [addr.host, addr.port];
}
exports.bindAddrFromAllSources = bindAddrFromAllSources;
function copyOldMacOSDataDir() {
    return __awaiter(this, void 0, void 0, function () {
        var oldDataDir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (os.platform() !== "darwin") {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fs.pathExists(util_1.paths.data)];
                case 1:
                    if (_a.sent()) {
                        return [2 /*return*/];
                    }
                    oldDataDir = path.join(os.homedir(), "Library/Application Support", "code-server");
                    return [4 /*yield*/, fs.pathExists(oldDataDir)];
                case 2:
                    if (!_a.sent()) return [3 /*break*/, 4];
                    return [4 /*yield*/, fs.copy(oldDataDir, util_1.paths.data)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=cli.js.map