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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var logger_1 = require("@coder/logger");
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
    cert: {
        type: OptionalString,
        path: true,
        description: "Path to certificate. Generated if no path is provided.",
    },
    "cert-key": { type: "string", path: true, description: "Path to certificate key when using non-generated cert." },
    "disable-updates": { type: "boolean", description: "Disable automatic updates." },
    "disable-telemetry": { type: "boolean", description: "Disable telemetry." },
    help: { type: "boolean", short: "h", description: "Show this output." },
    json: { type: "boolean" },
    open: { type: "boolean", description: "Open in browser on startup. Does not work remotely." },
    "bind-addr": { type: "string", description: "Address to bind to in host:port." },
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
exports.parse = function (argv) {
    var args = { _: [] };
    var ended = false;
    var _loop_1 = function (i) {
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
                throw new Error("Unknown option " + arg);
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
                throw new Error("--" + key + " requires a value");
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
                        throw new Error("--" + key + " must be a number");
                    }
                    break;
                case OptionalString:
                    ;
                    args[key] = new OptionalString(value);
                    break;
                default: {
                    if (!Object.values(option.type).includes(value)) {
                        throw new Error("--" + key + " valid values: [" + Object.values(option.type).join(", ") + "]");
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
    var out_i_1;
    for (var i = 0; i < argv.length; ++i) {
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
    if (!args["user-data-dir"]) {
        args["user-data-dir"] = util_1.xdgLocalDir;
    }
    if (!args["extensions-dir"]) {
        args["extensions-dir"] = path.join(args["user-data-dir"], "extensions");
    }
    return args;
};
//# sourceMappingURL=cli.js.map