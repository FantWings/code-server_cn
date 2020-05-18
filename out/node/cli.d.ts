import { Args as VsArgs } from "../../lib/vscode/src/vs/server/ipc";
import { AuthType } from "./http";
export declare class Optional<T> {
    readonly value?: T | undefined;
    constructor(value?: T | undefined);
}
export declare enum LogLevel {
    Trace = "trace",
    Debug = "debug",
    Info = "info",
    Warn = "warn",
    Error = "error"
}
export declare class OptionalString extends Optional<string> {
}
export interface Args extends VsArgs {
    readonly config?: string;
    readonly auth?: AuthType;
    readonly password?: string;
    readonly cert?: OptionalString;
    readonly "cert-key"?: string;
    readonly "disable-telemetry"?: boolean;
    readonly help?: boolean;
    readonly host?: string;
    readonly json?: boolean;
    log?: LogLevel;
    readonly open?: boolean;
    readonly port?: number;
    readonly "bind-addr"?: string;
    readonly socket?: string;
    readonly version?: boolean;
    readonly force?: boolean;
    readonly "list-extensions"?: boolean;
    readonly "install-extension"?: string[];
    readonly "show-versions"?: boolean;
    readonly "uninstall-extension"?: string[];
    readonly "proxy-domain"?: string[];
    readonly locale?: string;
    readonly _: string[];
}
export declare const optionDescriptions: () => string[];
export declare const parse: (argv: string[], opts?: {
    configFile: string;
} | undefined) => Promise<Args>;
/**
 * Reads the code-server yaml config file and returns it as Args.
 *
 * @param configPath Read the config from configPath instead of $CODE_SERVER_CONFIG or the default.
 */
export declare function readConfigFile(configPath?: string): Promise<Args>;
export declare function bindAddrFromAllSources(cliArgs: Args, configArgs: Args): [string, number];
