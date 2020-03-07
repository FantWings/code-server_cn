/// <reference types="node" />
import * as http from "http";
import * as net from "net";
import { Application, RecentResponse, RunningResponse } from "../../common/api";
import { HttpProvider, HttpProviderOptions, HttpResponse, HttpServer, Route } from "../http";
import { VscodeHttpProvider } from "./vscode";
/**
 * API HTTP provider.
 */
export declare class ApiHttpProvider extends HttpProvider {
    private readonly server;
    private readonly vscode;
    private readonly dataDir?;
    private readonly ws;
    private readonly sessions;
    constructor(options: HttpProviderOptions, server: HttpServer, vscode: VscodeHttpProvider, dataDir?: string | undefined);
    dispose(): void;
    handleRequest(route: Route, request: http.IncomingMessage): Promise<HttpResponse>;
    handleWebSocket(route: Route, request: http.IncomingMessage, socket: net.Socket, head: Buffer): Promise<true>;
    private handleStatusSocket;
    /**
     * A socket that connects to a session.
     */
    private handleRunSocket;
    /**
     * Return whitelisted applications.
     */
    applications(): Promise<ReadonlyArray<Application>>;
    /**
     * Return installed applications.
     */
    installedApplications(): Promise<ReadonlyArray<Application>>;
    /**
     * Get a running application.
     */
    getRunningApplication(sessionIdOrPath?: string): Application | undefined;
    /**
     * Handle /session endpoint.
     */
    private session;
    /**
     * Kill a session identified by `app.sessionId`.
     */
    deleteSession(sessionId: string): Promise<HttpResponse>;
    /**
     * Create a new session and return the session ID.
     */
    createSession(app: Application): Promise<string>;
    /**
     * Return VS Code's recent paths.
     */
    recent(): Promise<RecentResponse>;
    /**
     * Return running sessions.
     */
    running(): Promise<RunningResponse>;
    /**
     * For these, just return the error message since they'll be requested as
     * JSON.
     */
    getErrorRoot(_route: Route, _title: string, _header: string, error: string): Promise<HttpResponse>;
}
